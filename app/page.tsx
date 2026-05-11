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
import Sam3Model from "@/components/deck/Sam3Model";
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
//  10  Player Segmentation    (09)
//  11  Banner Seg & Tracking  (10)
//  12  Banner Seg Videos      (11)
//  13  SAM3 Model             (12) ★ NEW
//  14  SAM3 Experiments       (13)
//  15  Homography             (14)
//  16  Single Vanishing Point (15)
//  17  Logo Overlay           (16)
//  18  Final Result           (17)
//  19  Walkover Sequence      (18)
//  20  Demo                   (19)
//  21  Headline Numbers       (20)
//  22  Evaluation             (21)
//  23  Modal + Speed          (22)
//  24  Future Improvements    (—)
//  25  Thanks                 (—)
const PIPELINE_MINIMAP = {
  slide: 8, // Pipeline Overview
  range: [9, 17] as [number, number],
  highlights: {
    9: "sam2-arch",
    10: "detect-player",
    11: "banner-seg",
    12: "banner-seg-videos",
    13: "sam2-arch",
    14: "sam2-arch",
    15: "homography",
    16: "homography",
    17: "overlay-logo",
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
  2,  // 10 Player Segmentation
  1,  // 11 Banner Segmentation
  5,  // 12 Banner Segmentation Videos
  1,  // 13 SAM3 Model
  1,  // 14 SAM3 Experiments
  15, // 15 Homography
  1,  // 16 Single Vanishing Point
  3,  // 17 Logo Overlay
  4,  // 18 Final Result
  5,  // 19 Walkover Sequence
  3,  // 20 Demo
  1,  // 21 Headline Numbers
  3,  // 22 Evaluation
  1,  // 23 Modal + Speed
  1,  // 24 Future Improvements
  1,  // 25 Thanks
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
      <PlayerTracking />
      <BannerSegmentation />
      <BannerSegmentationVideos />
      <Sam3Model />
      <Sam3Experiments />
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
