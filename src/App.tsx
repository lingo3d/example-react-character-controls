import { Joystick } from "lingo3d-react"
import {
  Dummy,
  Model,
  Reflector,
  ThirdPersonCamera,
  World,
  types,
  usePreload,
  keyboard,
  TweakPane,
  PaneInput
} from "lingo3d-react"
import { useEffect, useRef, useState } from "react"
import "./App.css"

// Game world component
// 场景组件
const Game = () => {
  // ref to player character model
  // 玩家角色模型的ref
  const dummyRef = useRef<types.Dummy>(null)

  // If strideMode is "aim", camera is always behind character when character is moving
  // 如果strideMode为"aim", 当角色移动时, 摄像机始终在角色身后
  const [strideMode, setStrideMode] = useState<"aim" | "free">("aim")

  // If lockTargetRotation is "true", character always faces the direction that the camera looks at
  // 如果lockTargetRotation为"true", 角色始终面向摄像机的朝向
  const [lockTargetRotation, setlockTargetRotation] = useState<boolean | "dynamic-lock">(true)

  // listen to keyboard events, enable WASD controls
  // 监听键盘事件，启用WASD控制
  useEffect(() => {
    const dummy = dummyRef.current
    if (!dummy) return

    keyboard.onKeyPress = (_, keys) => {
      // stride forward and stride right determine the direction the player is moving towards
      // 向前和向右的步伐，用于确定玩家的移动方向
      if (keys.has("w")) dummy.strideForward = -5
      else if (keys.has("s")) dummy.strideForward = 5
      else dummy.strideForward = 0

      if (keys.has("a")) dummy.strideRight = 5
      else if (keys.has("d")) dummy.strideRight = -5
      else dummy.strideRight = 0
    }
  }, [])

  return (
    <World
      defaultLight="env.jpg"
      bloomStrength={1}
      bloomThreshold={0.5}
    >
      {/* map model, bloom enabled */}
      {/* 地图模型, 启用泛光特效 */}
      <Model physics="map" bloom scale={20} src="scene.glb" />

      {/* character model, and the camera that follows it */}
      {/* 角色模型，和跟随它的相机 */}
      <ThirdPersonCamera
        active
        mouseControl="drag"
        lockTargetRotation={lockTargetRotation}
        enableDamping
      >
        <Dummy
          physics="character"
          ref={dummyRef}
          metalnessFactor={-2}
          roughnessFactor={0}
          y={44.58}
          strideMove
          strideMode={strideMode}
        />
      </ThirdPersonCamera>

      {/* Ground reflection */}
      {/* 地面反射 */}
      <Reflector y={-39.38} scale={113.2} />

      {/* joystick */}
      {/* 摇杆 */}
      <Joystick
        onMove={(e) => {
          const dummy = dummyRef.current
          if (!dummy) return

          dummy.strideForward = -e.y * 5
          dummy.strideRight = -e.x * 5
        }}
        onMoveEnd={() => {
          const dummy = dummyRef.current
          if (!dummy) return

          dummy.strideForward = 0
          dummy.strideRight = 0
        }}
      />

      {/* Options panel */}
      {/* 参数面板 */}
      <TweakPane>
        <PaneInput
          name="strideMode"
          value="aim"
          values={["aim", "free"]}
          onChange={(val) => setStrideMode(val)}
        />
        <PaneInput
          name="lockTargetRotation"
          value={true}
          values={[true, false, "dynamic-lock"]}
          onChange={(val) => setlockTargetRotation(val)}
        />
      </TweakPane>
    </World>
  )
}

const App = () => {
  const progress = usePreload(["scene.glb"], "1.2mb")

  if (progress < 100)
    return (
      <div className="w-screen h-screen absolute left-0 top-0 text-white bg-black flex items-center justify-center">
        loaded: {Math.round(progress)}%
      </div>
    )

  return <Game />
}

export default App
