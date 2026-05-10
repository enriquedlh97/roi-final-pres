import Presentation from "@/components/Presentation";
import Title from "@/components/deck/Title";
import Team from "@/components/deck/Team";
import ProblemOutline from "@/components/deck/ProblemOutline";
import Challenges from "@/components/deck/Challenges";
import PriorWork from "@/components/deck/PriorWork";
import OurApproach from "@/components/deck/OurApproach";
import ComparisonTable from "@/components/deck/ComparisonTable";
import ModalSpeedBenchmark from "@/components/deck/ModalSpeedBenchmark";
import PipelineOverview from "@/components/deck/PipelineOverview";
import Sam2Architecture from "@/components/deck/Sam2Architecture";
import Sam3Experiments from "@/components/deck/Sam3Experiments";
import PlayerTracking from "@/components/deck/PlayerTracking";
import BannerSegmentation from "@/components/deck/BannerSegmentation";
import BannerSegmentationVideos from "@/components/deck/BannerSegmentationVideos";
import Homography from "@/components/deck/Homography";
import SingleVanishingPoint from "@/components/deck/SingleVanishingPoint";
import LogoOverlay from "@/components/deck/LogoOverlay";
import FinalResultRegions from "@/components/deck/FinalResultRegions";
import WalkoverSequence from "@/components/deck/WalkoverSequence";
import Demo from "@/components/deck/Demo";
import VisualReviewDiscipline from "@/components/deck/VisualReviewDiscipline";
import FutureImprovements from "@/components/deck/FutureImprovements";
import Thanks from "@/components/deck/Thanks";

// WARNING: minimap indices must match slide order below. Update if slides are added/removed.
// Slide layout (final, post-hand-off):
//   0  Title
//   1  Team
//   2  Problem Outline
//   3  Challenges
//   4  Prior Work
//   5  Our Approach
//   6  Comparison Table
//   7  Modal + Speed Benchmarking
//   8  Pipeline Overview        ← minimap host
//   9  SAM2 Architecture        ← minimap range start
//  10  SAM3 Experiments
//  11  Player Tracking
//  12  Banner Segmentation
//  13  Banner Segmentation Videos
//  14  Homography
//  15  Single Vanishing Point
//  16  Logo Overlay             ← minimap range end (last pipeline stage)
//  17  Final Result — Region by Region   ← NEW (paired crop strips)
//  18  Walkover Sequence                  ← NEW (5 forensic sheets)
//  19  Demo                                (final video + side-by-side)
//  20  Visual Review > Rubric              ← NEW (the discipline narrative)
//  21  Future Improvements
//  22  Thanks
const PIPELINE_MINIMAP = {
  slide: 8, // Pipeline Overview
  range: [9, 16] as [number, number],
  highlights: {
    9: "sam2-arch",
    10: "sam2-arch", // SAM3 Experiments — keep SAM-arch lit
    11: "detect-player",
    12: "banner-seg",
    13: "banner-seg-videos",
    14: "homography",
    15: "homography", // Single Vanishing Point — keep homography lit
    16: "overlay-logo",
  },
};

const SLIDE_STEPS = [
  1,  // 0  Title
  5,  // 1  Team
  2,  // 2  Problem Outline
  1,  // 3  Challenges
  4,  // 4  Prior Work
  4,  // 5  Our Approach
  2,  // 6  Comparison Table
  1,  // 7  Modal + Speed Benchmarking
  1,  // 8  Pipeline Overview
  1,  // 9  SAM2 Architecture
  1,  // 10 SAM3 Experiments
  2,  // 11 Player Tracking
  1,  // 12 Banner Segmentation
  5,  // 13 Banner Segmentation Videos
  15, // 14 Homography
  1,  // 15 Single Vanishing Point
  3,  // 16 Logo Overlay
  4,  // 17 Final Result — Region by Region
  5,  // 18 Walkover Sequence
  3,  // 19 Demo
  2,  // 20 Visual Review > Rubric
  1,  // 21 Future Improvements
  1,  // 22 Thanks
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
      <ModalSpeedBenchmark />
      <PipelineOverview />
      <Sam2Architecture />
      <Sam3Experiments />
      <PlayerTracking />
      <BannerSegmentation />
      <BannerSegmentationVideos />
      <Homography />
      <SingleVanishingPoint />
      <LogoOverlay />
      <FinalResultRegions />
      <WalkoverSequence />
      <Demo />
      <VisualReviewDiscipline />
      <FutureImprovements />
      <Thanks />
    </Presentation>
  );
}
