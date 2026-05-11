import {useEffect, useRef} from "react";
import {Application, Assets, Sprite} from "pixi.js";

type LayerConfig = {sprite: Sprite; dx: number; dy: number; parallax: number};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileImgRef = useRef<HTMLImageElement>(null);

  const basePath =
    typeof window !== "undefined" && (window as any).CANOPY_BASE_PATH
      ? String((window as any).CANOPY_BASE_PATH).replace(/\/+$/, "")
      : "";

  const handleMobileImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (window.innerWidth > 768) return;
    const wrapper = mobileWrapperRef.current;
    if (!wrapper) return;
    const img = e.currentTarget;
    const renderedHeight =
      img.naturalWidth > 0
        ? (img.naturalHeight * wrapper.clientWidth) / img.naturalWidth
        : 600;
    wrapper.style.height = `${Math.ceil(renderedHeight)}px`;
    requestAnimationFrame(() => {
      wrapper.classList.add("hero__mobile-image__wrapper--loaded");
    });
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const img = mobileImgRef.current;
      const wrapper = mobileWrapperRef.current;
      if (img?.complete && img.naturalWidth > 0 && wrapper) {
        const renderedHeight =
          (img.naturalHeight * wrapper.clientWidth) / img.naturalWidth;
        wrapper.style.transition = "none";
        wrapper.style.height = `${Math.ceil(renderedHeight)}px`;
        img.style.clipPath = "inset(0 0 0% 0)";
        img.style.opacity = "1";
        img.style.transition = "none";
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const app = new Application();
    let mounted = true;

    const targetPointer = {x: 0, y: 0};
    const smoothPointer = {x: 0, y: 0};

    const updatePositions = (nx: number, ny: number) => {
      const w = app.renderer.width;
      const h = app.renderer.height;
      const cx = w / 2;
      const cy = h / 2;
      for (const layer of layerConfigs) {
        layer.sprite.x = cx + layer.dx + nx * layer.parallax;
        layer.sprite.y = cy + layer.dy + ny * layer.parallax;
      }
    };

    let layerConfigs: LayerConfig[] = [];

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      targetPointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      targetPointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };

    const onPointerLeave = () => {
      targetPointer.x = 0;
      targetPointer.y = 0;
    };

    const onTick = () => {
      const k = 0.1;
      smoothPointer.x += (targetPointer.x - smoothPointer.x) * k;
      smoothPointer.y += (targetPointer.y - smoothPointer.y) * k;
      if (layerConfigs.length) {
        updatePositions(smoothPointer.x, smoothPointer.y);
      }
    };

    const onRendererResize = () => {
      if (layerConfigs.length) {
        updatePositions(smoothPointer.x, smoothPointer.y);
      }
    };

    (async () => {
      await app.init({backgroundAlpha: 0, resizeTo: container});
      if (!mounted) return;

      container.appendChild(app.canvas);

      const texture_paper = await Assets.load(`${basePath}/collage_paper.webp`);
      const texture_draft = await Assets.load(`${basePath}/collage_draft.webp`);
      const texture_envelope = await Assets.load(`${basePath}/collage_envelope.webp`);
      const texture_chiha = await Assets.load(`${basePath}/collage_chiha.webp`);
      const texture_newspaper = await Assets.load(`${basePath}/collage_newspaper.webp`);
      const texture_doodle_1 = await Assets.load(`${basePath}/collage_doodle_1.webp`);
      const texture_doodle_2 = await Assets.load(`${basePath}/collage_doodle_2.webp`);
      const texture_minichiha = await Assets.load(`${basePath}/collage_minichiha.webp`);
      const texture_roundshape = await Assets.load(`${basePath}/collage_roundshape.webp`);
      const texture_date1926 = await Assets.load(`${basePath}/collage_date1926.webp`);
      const texture_e413 = await Assets.load(`${basePath}/collage_e413.webp`);


      if (!mounted) return;

      const paper = new Sprite(texture_paper);
      paper.anchor.set(0.5);
      paper.eventMode = "static";
      paper.scale.set(
        Math.min(700 / paper.texture.width, 700 / paper.texture.height)
      );

      const draft = new Sprite(texture_draft);
      draft.anchor.set(0.5);
      draft.eventMode = "static";
      draft.scale.set(
        Math.min(250 / draft.texture.width, 250 / draft.texture.height)
      );

      const envelope = new Sprite(texture_envelope);
      envelope.anchor.set(0.5);
      envelope.eventMode = "static";
      envelope.scale.set(
        Math.min(300 / envelope.texture.width, 300 / envelope.texture.height)
      );

      const chiha = new Sprite(texture_chiha);
      chiha.anchor.set(0.5);
      chiha.eventMode = "static";
      chiha.scale.set(
        Math.min(900 / chiha.texture.width, 900 / chiha.texture.height)
      );

      const newspaper = new Sprite(texture_newspaper);
      newspaper.anchor.set(0.5);
      newspaper.eventMode = "static";
      newspaper.scale.set(
        Math.min(350 / newspaper.texture.width, 350 / newspaper.texture.height)
      );

      const doodle_1 = new Sprite(texture_doodle_1);
      doodle_1.anchor.set(0.5);
      doodle_1.eventMode = "static";
      doodle_1.scale.set(
        Math.min(500 / doodle_1.texture.width, 500 / doodle_1.texture.height)
      );

      const doodle_2 = new Sprite(texture_doodle_2);
      doodle_2.anchor.set(0.5);
      doodle_2.eventMode = "static";
      doodle_2.scale.set(
        Math.min(220 / doodle_2.texture.width, 220 / doodle_2.texture.height)
      );

      const roundshape = new Sprite(texture_roundshape);
      roundshape.anchor.set(0.5);
      roundshape.eventMode = "static";
      roundshape.scale.set(
        Math.min(150 / roundshape.texture.width, 150 / roundshape.texture.height)
      );

      const date1926 = new Sprite(texture_date1926);
      date1926.anchor.set(0.5);
      date1926.eventMode = "static";
      date1926.scale.set(
        Math.min(720 / date1926.texture.width, 720 / date1926.texture.height)
      );

      const e413 = new Sprite(texture_e413);
      e413.anchor.set(0.5);
      e413.eventMode = "static";
      e413.scale.set(
        Math.min(120 / e413.texture.width, 120 / e413.texture.height)
      );

      const minichiha = new Sprite(texture_minichiha);
      minichiha.anchor.set(0.5);
      minichiha.eventMode = "static";
      minichiha.scale.set(
        Math.min(400 / minichiha.texture.width, 400 / minichiha.texture.height)
      );

      layerConfigs = [
        {sprite: paper, dx: 50, dy: 100, parallax: 5},
        {sprite: draft, dx: -300, dy: -50, parallax: 10},
        {sprite: envelope, dx: 200, dy: -100, parallax: 10},
        {sprite: chiha, dx: 0, dy: 0, parallax: 15},
        {sprite: newspaper, dx: 450, dy: 150, parallax: 30},
        {sprite: doodle_1, dx: 350, dy: 100, parallax: 25},
        {sprite: doodle_2, dx: -330, dy: 100, parallax: 30},
        {sprite: roundshape, dx: 350, dy: 150, parallax: 20},
        {sprite: date1926, dx: -250, dy: 50, parallax: 30},
        {sprite: e413, dx: -420, dy: 200, parallax: 30},
        {sprite: minichiha, dx: -400, dy: 50, parallax: 30},
      ];

      app.stage.addChild(paper);
      app.stage.addChild(draft);
      app.stage.addChild(envelope);
      app.stage.addChild(chiha);
      app.stage.addChild(roundshape);
      app.stage.addChild(date1926);
      app.stage.addChild(e413);
      app.stage.addChild(minichiha);
      app.stage.addChild(newspaper);
      app.stage.addChild(doodle_1);
      app.stage.addChild(doodle_2);

      app.renderer.on("resize", onRendererResize);
      app.ticker.add(onTick);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);

      updatePositions(0, 0);
    })();

    return () => {
      mounted = false;
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (app.renderer) {
        app.renderer.off("resize", onRendererResize);
      }
      if (app.ticker) {
        app.ticker.remove(onTick);
      }
      app.destroy(true, {children: true});
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="hero__pixi-container" />
      <div className="hero__mobile-image">
        <div ref={mobileWrapperRef} className="hero__mobile-image__wrapper">
          <img
            ref={mobileImgRef}
            src={`${basePath}/hero_image_mobile.webp`}
            alt="Michel Chiha's Constitutional Papers"
            onLoad={handleMobileImageLoad}
          />
        </div>
      </div>
    </>
  );
}