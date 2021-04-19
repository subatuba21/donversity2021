import React, { useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import MediaView from "../../components/MediaView/MediaView";
import { DataContext } from "../../misc/DataContext";
import { ContentSections } from "../../types";
import styles from "./ClubPage.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import { Link } from "react-router-dom";

interface Params {
  club: string;
}

export default function ClubPage() {
  const data = useContext(DataContext) as ContentSections;
  const { club } = useParams<Params>();

  const clubInfo = data.clubs.find((c) => c.id === club);

  if (!clubInfo) return <Redirect to="/club-fair" />;

  return (
    <div className={styles.club}>
      <h1>{clubInfo.name}</h1>
      <div className={styles.clubMedia}>
        <img
          className={styles.mainImage}
          src={`/clubs/${clubInfo.image}`}
          alt={clubInfo.name}
        />
        {clubInfo.video && (
          <MediaView
            className={styles.clubVideo}
            type="video"
            url={`/clubs/${clubInfo.video}`} 
          />
        )}
      </div>
      {clubInfo.description.split("\n").map((fragment, i) => (
        <p key={i} className={styles.clubDescription}>
          {fragment}
        </p>
      ))}
      <AliceCarousel
        mouseTracking
        items={data.clubs
          .filter((c) => c.id !== club)
          .map((c, i) => (
            <div key={i} className={styles.otherClub}>
              <Link to={`/club-fair/${c.id}`}>
                <div>
                  <h4>{c.name}</h4>
                </div>
                <img
                  src={`/clubs/${c.image}`}
                  alt={c.name}
                  className={styles.clubImage}
                />
              </Link>
            </div>
          ))}
        autoWidth
        infinite
        autoPlay
        autoPlayInterval={2000}
        animationDuration={2000}
        autoPlayStrategy="none"
      />
    </div>
  );
}
