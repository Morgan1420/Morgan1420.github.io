<template>
  <div class="rive-wrapper" ref="wrapperRef">
    <canvas ref="canvasRef" class="rive-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  stateMachine: {
    type: String,
    default: null,
  },
  animation: {
    type: [String, Array],
    default: null,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  fit: {
    type: String,
    default: 'contain',
  },
  alignment: {
    type: String,
    default: 'center',
  },
  repeatInterval: {
    type: Number,
    default: 0, // Interval in milliseconds (0 = no repeat)
  },
})

const emit = defineEmits(['loaded', 'error'])

const wrapperRef = ref(null)
const canvasRef = ref(null)
let riveInstance = null
let resizeObserver = null
let repeatTimer = null

const fitMap = {
  contain: Fit.Contain,
  cover: Fit.Cover,
  fill: Fit.Fill,
  fitWidth: Fit.FitWidth,
  fitHeight: Fit.FitHeight,
  none: Fit.None,
}

const alignmentMap = {
  center: Alignment.Center,
  topLeft: Alignment.TopLeft,
  topCenter: Alignment.TopCenter,
  topRight: Alignment.TopRight,
  centerLeft: Alignment.CenterLeft,
  centerRight: Alignment.CenterRight,
  bottomLeft: Alignment.BottomLeft,
  bottomCenter: Alignment.BottomCenter,
  bottomRight: Alignment.BottomRight,
}

function updateCanvasDimensions() {
  if (!wrapperRef.value || !canvasRef.value) return

  const rect = wrapperRef.value.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1

  canvasRef.value.width = Math.max(1, Math.round(rect.width * dpr))
  canvasRef.value.height = Math.max(1, Math.round(rect.height * dpr))

  if (riveInstance) {
    riveInstance.resizeDrawingSurfaceToCanvas()
  }
}

function clearRepeatTimer() {
  if (repeatTimer) {
    clearInterval(repeatTimer)
    repeatTimer = null
  }
}

function replay() {
  if (!riveInstance) return
  try {
    riveInstance.reset({
      stateMachines: props.stateMachine
        ? [props.stateMachine]
        : !props.animation
          ? ['State Machine 1']
          : undefined,
      animations: props.animation
        ? Array.isArray(props.animation)
          ? props.animation
          : [props.animation]
        : undefined,
      autoplay: true,
    })
    riveInstance.play()
  } catch (err) {
    console.error('Error al reiniciar la animación Rive:', err)
  }
}

function startRepeatTimer() {
  clearRepeatTimer()
  if (!props.repeatInterval || props.repeatInterval <= 0) return

  repeatTimer = setInterval(() => {
    if (typeof document !== 'undefined' && document.hidden) return
    replay()
  }, props.repeatInterval)
}

function handleVisibilityChange() {
  if (typeof document !== 'undefined' && !document.hidden && props.repeatInterval > 0) {
    replay()
    startRepeatTimer()
  }
}

async function initRive() {
  if (!canvasRef.value || !props.src) return

  updateCanvasDimensions()

  try {
    const layout = new Layout({
      fit: fitMap[props.fit] || Fit.Contain,
      alignment: alignmentMap[props.alignment] || Alignment.Center,
    })

    const response = await fetch(props.src)
    const buffer = await response.arrayBuffer()

    const riveConfig = {
      buffer,
      canvas: canvasRef.value,
      autoplay: props.autoplay,
      layout,
      onLoad: () => {
        if (riveInstance) {
          riveInstance.resizeDrawingSurfaceToCanvas()
          startRepeatTimer()
          emit('loaded', { rive: riveInstance })
        }
      },
      onLoadError: (err) => {
        console.error('Error al cargar la animación Rive:', err)
        emit('error', err)
      },
    }

    if (props.stateMachine) {
      riveConfig.stateMachines = [props.stateMachine]
    } else if (props.animation) {
      riveConfig.animations = Array.isArray(props.animation) ? props.animation : [props.animation]
    } else {
      riveConfig.stateMachines = ['State Machine 1']
    }

    riveInstance = new Rive(riveConfig)
  } catch (err) {
    console.error('Error inicializando Rive:', err)
    emit('error', err)
  }
}

onMounted(() => {
  initRive()

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  if (wrapperRef.value && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions()
    })
    resizeObserver.observe(wrapperRef.value)
  }
})

onBeforeUnmount(() => {
  clearRepeatTimer()

  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }

  if (resizeObserver && wrapperRef.value) {
    resizeObserver.unobserve(wrapperRef.value)
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (riveInstance) {
    try {
      riveInstance.cleanup()
    } catch {
      // Ignorar si ya estaba limpio
    }
    riveInstance = null
  }
})

watch(
  () => props.src,
  () => {
    clearRepeatTimer()
    if (riveInstance) {
      riveInstance.cleanup()
      riveInstance = null
    }
    initRive()
  },
)

watch(
  () => props.repeatInterval,
  () => {
    startRepeatTimer()
  },
)

defineExpose({
  replay,
  getRive: () => riveInstance,
})
</script>

<style scoped>
.rive-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.rive-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
