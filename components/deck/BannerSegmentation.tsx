"use client";

export default function BannerSegmentation() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="animate-stagger flex max-w-2xl flex-col items-start">
        <span className="mb-4 font-mono text-sm tracking-widest text-accent">11</span>
        <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">
          Banner Segmentation<br />& Tracking
        </h2>
        <div className="mt-6 h-px w-16 bg-accent" />
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Detect advertising banners across different regions of the court — ground-level boards, back wall panels, net-mounted banners, umpire stand signage, and more.
        </p>
      </div>
    </div>
  );
}
