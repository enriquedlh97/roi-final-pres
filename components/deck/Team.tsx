import TeamSlide from "../slides/TeamSlide";
import { BASE } from "@/lib/basePath";

export default function Team() {
  return (
    <TeamSlide
      members={[
        { name: "Raghav", role: "MS CSE Harvard", initials: "R", color: "bg-indigo-600", linkedin: "https://www.linkedin.com/in/raghav-punnam/", photo: `${BASE}/team-raghav.png` },
        { name: "Enrique", role: "MS CSE Harvard", initials: "E", color: "bg-amber-600", linkedin: "https://www.linkedin.com/in/enrique-d%C3%ADaz-de-le%C3%B3n-hicks-33b933103/", photo: `${BASE}/team-enrique.png` },
        { name: "Giovanni", role: "MS CSE Polimi", initials: "G", color: "bg-emerald-600", linkedin: "https://www.linkedin.com/in/giovannivisi/", photo: `${BASE}/team-giovanni.png` },
        { name: "Martina", role: "MS CSE Polimi", initials: "M", color: "bg-rose-600", linkedin: "https://www.linkedin.com/in/martina-maiorana-6baa97254/", photo: `${BASE}/team-martina.png`, photoScale: 1.3 },
      ]}
    />
  );
}
