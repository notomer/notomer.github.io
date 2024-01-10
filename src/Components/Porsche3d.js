import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/Porsche.glb");
  return <primitive object={scene} {...props} />
}

function Porsche3d() {
  return (
    <Canvas dpr={[1,2]} shadows camera={{ fov: 45 }} style={{"position": "absolute"}}>
      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={""}>
          <Model scale={0.006} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default Porsche3d;