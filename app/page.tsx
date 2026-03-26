import Presentation from "@/components/Presentation";
import Title from "@/components/deck/Title";
import Team from "@/components/deck/Team";
import ProblemOutline from "@/components/deck/ProblemOutline";
import Challenges from "@/components/deck/Challenges";
import PriorWork from "@/components/deck/PriorWork";
import OurApproach from "@/components/deck/OurApproach";
import ComparisonTable from "@/components/deck/ComparisonTable";
import PipelineOverview from "@/components/deck/PipelineOverview";
import BoardsSegmentation from "@/components/deck/BoardsSegmentation";
import Homography from "@/components/deck/Homography";
import LogoOverlay from "@/components/deck/LogoOverlay";
import PlayerTracking from "@/components/deck/PlayerTracking";
import Demo from "@/components/deck/Demo";
import FutureImprovements from "@/components/deck/FutureImprovements";
import AsksMitsubishi from "@/components/deck/AsksMitsubishi";
import Thanks from "@/components/deck/Thanks";

// WARNING: minimap indices must match slide order below. Update if slides are added/removed.
const PIPELINE_MINIMAP = {
  slide: 7,
  range: [8, 11] as [number, number],
  highlights: { 8: "banner-seg", 9: "homography", 10: "overlay-logo", 11: "detect-player" },
};

const SLIDE_STEPS = [
  1,  // Title
  5,  // Team (1 heading + 4 reveals)
  2,  // Problem Outline (1 base + 1 bounding box reveal)
  1,  // Challenges
  4,  // Prior Work (title + commercial + academic + gap)
  3,  // Our Approach (thesis + pipeline diagram + conclusion)
  2,  // Comparison Table (full table + row highlight)
  1,  // Pipeline Overview
  6,  // Boards Segmentation (1 intro + 1 SAM + 4 experiments)
  15, // Homography (1 intro + 5 motivation + 1 vanishing point + 8 fit steps)
  3,  // Logo Overlay (1 intro + 2 examples)
  2,  // Player Tracking (1 intro + 1 video demo)
  3,  // Demo (stable + moving + player overlay)
  1,  // Future Improvements
  1,  // Asks From Mitsubishi
  1,  // Thanks
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
      <BoardsSegmentation />
      <Homography />
      <LogoOverlay />
      <PlayerTracking />
      <Demo />
      <FutureImprovements />
      <AsksMitsubishi />
      <Thanks />
    </Presentation>
  );
}
