import Presentation from "@/components/Presentation";
import Title from "@/components/deck/Title";
import Team from "@/components/deck/Team";
import ProblemOutline from "@/components/deck/ProblemOutline";
import Challenges from "@/components/deck/Challenges";
import PriorWork from "@/components/deck/PriorWork";
import OurApproach from "@/components/deck/OurApproach";
import ComparisonTable from "@/components/deck/ComparisonTable";
import PipelineOverview from "@/components/deck/PipelineOverview";
import Sam2Architecture from "@/components/deck/Sam2Architecture";
import PlayerTracking from "@/components/deck/PlayerTracking";
import BannerSegmentation from "@/components/deck/BannerSegmentation";
import BannerSegmentationVideos from "@/components/deck/BannerSegmentationVideos";
import Homography from "@/components/deck/Homography";
import LogoOverlay from "@/components/deck/LogoOverlay";
import Demo from "@/components/deck/Demo";
import FutureImprovements from "@/components/deck/FutureImprovements";
import AsksMitsubishi from "@/components/deck/AsksMitsubishi";
import Thanks from "@/components/deck/Thanks";

// WARNING: minimap indices must match slide order below. Update if slides are added/removed.
const PIPELINE_MINIMAP = {
  slide: 7,
  range: [8, 14] as [number, number],
  highlights: {
    8: "sam2-arch",
    9: "detect-player",
    10: "banner-seg",
    11: "banner-seg-videos",
    12: "homography",
    13: "overlay-logo",
    14: "demo",
  },
};

const SLIDE_STEPS = [
  1,  // 0  Title
  5,  // 1  Team (1 heading + 4 reveals)
  2,  // 2  Problem Outline (1 base + 1 bounding box reveal)
  1,  // 3  Challenges
  4,  // 4  Prior Work (title + commercial + academic + gap)
  4,  // 5  Our Approach (thesis + pipeline diagram + strengths + conclusion)
  2,  // 6  Comparison Table (full table + row highlight)
  1,  // 7  Pipeline Overview (06)
  1,  // 8  SAM2 Architecture (07)
  2,  // 9  Player Tracking (08) (1 intro + 1 video demo)
  1,  // 10 Banner Segmentation (09)
  5,  // 11 Banner Segmentation Videos (10) (5 experiments)
  15, // 12 Homography (11) (1 intro + 5 motivation + 1 vanishing point + 8 fit steps)
  3,  // 13 Logo Overlay (12) (1 intro + 2 examples)
  3,  // 14 Demo (13) (stable + moving + player overlay)
  1,  // 15 Future Improvements
  1,  // 16 Asks From Mitsubishi
  1,  // 17 Thanks
];

export default function Home() {
  return (
    <Presentation slideSteps={SLIDE_STEPS} minimap={PIPELINE_MINIMAP}>
      <Title />
      <Team />
      <ProblemOutline />
      <Challenges />
      <PriorWork />
      <OurApproach />
      <ComparisonTable />
      <PipelineOverview />
      <Sam2Architecture />
      <PlayerTracking />
      <BannerSegmentation />
      <BannerSegmentationVideos />
      <Homography />
      <LogoOverlay />
      <Demo />
      <FutureImprovements />
      <AsksMitsubishi />
      <Thanks />
    </Presentation>
  );
}
