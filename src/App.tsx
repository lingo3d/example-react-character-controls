import { Dropdown, IDropdownStyles } from "@fluentui/react";
import {
  Dummy,
  Model,
  Reflector,
  Setup,
  ThirdPersonCamera,
  World,
  types,
  usePreload,
  useWindowSize,
  keyboard,
} from "lingo3d-react";
import { useEffect, useRef, useState } from "react";
import "./App.css";

const Game = () => {
  const dummyRef = useRef<types.Dummy>(null);
  const { width } = useWindowSize();
  const [strideMode, setStrideMode] = useState<"aim" | "free">("aim");
  const [lockTargetRotation, setlockTargetRotation] = useState<
    false | "lock" | "dynamic-lock"
  >("lock");

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  useEffect(() => {
    const dummy = dummyRef.current;
    if (!dummy) return;

    keyboard.onKeyPress = (_, keys) => {
      if (keys.has("w")) dummy.strideForward = -10;
      else if (keys.has("s")) dummy.strideForward = 10;
      else dummy.strideForward = 0;

      if (keys.has("a")) dummy.strideRight = 10;
      else if (keys.has("d")) dummy.strideRight = -10;
      else dummy.strideRight = 0;
    };
  }, []);

  return (
    <>
      <World>
        <Model
          physics="map"
          bloom
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          src="scene.glb"
        />
        <ThirdPersonCamera
          active
          mouseControl="drag"
          fov={width < 640 ? 110 : 90}
          lockTargetRotation={lockTargetRotation}
        >
          <Dummy
            physics="character"
            ref={dummyRef}
            metalnessFactor={0.5}
            roughnessFactor={0.5}
            bloom
            y={44.58}
            strideMove
            strideMode={strideMode}
          />
        </ThirdPersonCamera>
        <Reflector
          y={-39.38}
          scaleX={113.2}
          scaleY={113.2}
          rotationX={-90}
          contrast={1}
        />
        <Setup
          defaultFog="white"
          defaultLight="env1.jpg"
          bloomStrength={1}
          bloomThreshold={0.5}
        />
      </World>
      <div className="absolute  backdrop-blur-xl -mt-10 px-4 top-10">
        <div className={"h-2"} />
        <Dropdown
          placeholder="Select an option"
          label="Camera lockTargetRotation 相机锁定目标旋转"
          options={[
            { key: "false", text: "false 不锁定" },
            { key: "lock", text: "lock 锁定" },
            { key: "dynamic-lock", text: "dynamic-lock 动态锁定" },
          ]}
          styles={dropdownStyles}
          onChange={(_, option) => {
            if (!option) return;
            if (option.key === "false") setlockTargetRotation(false);
            else setlockTargetRotation(option.key as any);
          }}
          defaultSelectedKey="lock"
        />
        <div className={"h-4"} />
        <Dropdown
          placeholder="Select an option"
          label="Dummy strideMode 角色步伐模式"
          options={[
            { key: "aim", text: "aim 瞄准模式" },
            { key: "free", text: "free 自由模式" },
          ]}
          styles={dropdownStyles}
          onChange={(_, option) => {
            if (!option) return;
            setStrideMode(option.key as any);
          }}
          defaultSelectedKey="aim"
        />
      </div>
    </>
  );
};

const App = () => {
  const progress = usePreload(["scene.glb"], "1.2mb");

  if (progress < 100)
    return (
      <div className="w-screen h-screen absolute left-0 top-0 text-white bg-black flex items-center justify-center">
        loaded: {Math.round(progress)}%
      </div>
    );

  return <Game />;
};

export default App;
