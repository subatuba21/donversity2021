import React, { useContext, useState } from "react";
import styles from "./ClubsPage.module.css";
import { DataContext } from "../../misc/DataContext";
import { ContentSections, Club } from "../../types";
import { Link } from "react-router-dom";

function ClubDiv(club: Club) {
  const [hovering, setHovering] = useState(false);

  return (
    <Link to={`/club-fair/${club.id}`}>
      <div
        className={styles.club}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <p className={styles.mobileClubName}>{club.name}</p>
        <div
          className={`${styles.overlay} ${hovering && styles.overlayShow}`}
        >
          <h5 className={`${styles.clubName} ${hovering && styles.clubNameShow}`}>
            {club.name}
          </h5>
        </div>
        <img
          src={`/clubs/${club.image}`}
          alt={club.name}
          className={styles.clubImage}
        />
      </div>
    </Link>
  );
}

export default function ClubsPage() {
  const data = useContext(DataContext) as ContentSections;

  return (
    <>
      <div id={styles.top}>
        <h1 className={styles.heading}>Club Fair!</h1>
        <h5 id={styles.description}>A huge source of Diversity on our campus comes from our clubs. From Dance Clubs such as Bollywood and bhangra, to tech clubs such as Amador UAV's, we have it all! Celebrate Donversity by checking out some of these clubs.</h5>
      </div>
      <div className={styles.clubs}>
        {data.clubs.map((club, i) => (
          <ClubDiv key={i} {...club} />
        ))}
      </div>
    </>
  );
}
