import TitleSlide from "../slides/TitleSlide";

export default function Title() {
  return (
    <TitleSlide
      tag="Final Presentation"
      title="ROI Tracking in Sports Broadcasts"
      subtitle="Automated region-of-interest detection and virtual ad insertion in tennis broadcasts"
      authors={[
        { name: "Raghav", linkedin: "https://www.linkedin.com/in/raghav-punnam/" },
        { name: "Enrique", linkedin: "https://www.linkedin.com/in/enrique-d%C3%ADaz-de-le%C3%B3n-hicks-33b933103/" },
        { name: "Giovanni", linkedin: "https://www.linkedin.com/in/giovannivisi/" },
        { name: "Martina", linkedin: "https://www.linkedin.com/in/martina-maiorana-6baa97254/" },
      ]}
      date="May 2026"
    />
  );
}
