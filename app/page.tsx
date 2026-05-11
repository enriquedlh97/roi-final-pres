import Presentation from "@/components/Presentation";
import Title from "@/components/deck/Title";
import Team from "@/components/deck/Team";
import ProblemOutline from "@/components/deck/ProblemOutline";
import Challenges from "@/components/deck/Challenges";
import PriorWork from "@/components/deck/PriorWork";
import OurApproach from "@/components/deck/OurApproach";
import ProjectJourney from "@/components/deck/ProjectJourney";
import ComparisonTable from "@/components/deck/ComparisonTable";
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
import HeadlineNumbers from "@/components/deck/HeadlineNumbers";
import VisualReviewDiscipline from "@/components/deck/VisualReviewDiscipline";
import ModalSpeedBenchmark from "@/components/deck/ModalSpeedBenchmark";
import FutureImprovements from "@/components/deck/FutureImprovements";
import Thanks from "@/components/deck/Thanks";

// Slide layout (final hand-off · 25 slides · ~30 min target):
//   0  Title
//   1  Team
//   2  Problem Outline       (01)
//   3  Challenges             (02)
//   4  Prior Work             (03)
//   5  Our Approach           (04)
//   6  Project Journey        (05) ★ NEW — Phase 1 → 2 → 3 → Final
//   7  Comparison Table       (06)
//   8  Pipeline Overview      (07) ★ updated SVG labels
//   9  SAM2 Architecture      (08)
//  10  SAM3 Experiments       (09)
//  11  Player Segmentation    (10)
//  12  Banner Seg & Tracking  (11)
//  13  Banner Seg Videos      (12)
//  14  Homography             (13)
//  15  Single Vanishing Point (14)
//  16  Logo Overlay           (15)
//  17  Final Result           (16)
//  18  Walkover Sequence      (17)
//  19  Demo                   (18)
//  20  Headline Numbers       (19) ★ NEW
//  21  Evaluation             (20)
//  22  Modal + Speed          (21) ★ MOVED to engineering-rigor section
//  23  Future Improvements    (—)
//  24  Thanks                 (—)
const PIPELINE_MINIMAP = {
  slide: 8, // Pipeline Overview
  range: [9, 16] as [number, number],
  highlights: {
    9: "sam2-arch",
    10: "sam2-arch",
    11: "detect-player",
    12: "banner-seg",
    13: "banner-seg-videos",
    14: "homography",
    15: "homography",
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
  4,  // 6  Project Journey  (4 phase reveals)
  2,  // 7  Comparison Table
  1,  // 8  Pipeline Overview
  1,  // 9  SAM2 Architecture
  1,  // 10 SAM3 Experiments
  2,  // 11 Player Segmentation
  1,  // 12 Banner Segmentation
  5,  // 13 Banner Segmentation Videos
  15, // 14 Homography
  1,  // 15 Single Vanishing Point
  3,  // 16 Logo Overlay
  4,  // 17 Final Result
  5,  // 18 Walkover Sequence
  3,  // 19 Demo
  1,  // 20 Headline Numbers
  3,  // 21 Evaluation
  1,  // 22 Modal + Speed
  1,  // 23 Future Improvements
  1,  // 24 Thanks
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
      <ProjectJourney />
      <ComparisonTable />
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
      <HeadlineNumbers />
      <VisualReviewDiscipline />
      <ModalSpeedBenchmark />
      <FutureImprovements />
      <Thanks />
    </Presentation>
  );
}
