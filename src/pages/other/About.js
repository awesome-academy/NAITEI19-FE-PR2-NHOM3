import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderTwo from "../../wrappers/brand-logo/BrandLogoSliderTwo";

const SingleSpeciality = ({
  img,
  header,
  body,
}) => {
  return (
    <div style={{width: "450px"}}>
      <div className="container p-5">
        <img src={img} style={{width: '100%', aspectRatio: '1/1'}}/>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{gap: '1rem'}}>
        <h3>{header}</h3>
        <p className="text-center">{body}</p>
      </div>
    </div>
  );
}

const Specialities = () => {
  return (
    <div className="container-fluid d-flex justify-content-center flex-wrap mt-100 mb-95" style={{gap: '2rem'}}>
      <SingleSpeciality 
        img="https://upload.wikimedia.org/wikipedia/commons/b/bc/Content_curation.png"
        header="Expert Curation"
        body="Our team of passionate readers and book experts carefully curates our collection to ensure that every book we offer is of the highest quality."
      />
      <SingleSpeciality 
        img="https://hria.org/wp-content/uploads/2017/09/Capture_PH-HC_integration.png"
        header="Diverse Selection"
        body="We believe that diversity in literature is essential. That's why you'll find books from various genres, cultures, and perspectives on our shelves."
      />
      <SingleSpeciality 
        img="https://media.istockphoto.com/id/1312093641/vector/ai-powered-marketing-tools-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=wO6WVuuGR7UoJJTrPgZn24fjukYwGlwgr7O_JO9SoB4="
        header="Personalized Recommendations"
        body="Can't decide what to read next? Our knowledgeable staff is always ready to provide personalized recommendations based on your preferences."
      />
      <SingleSpeciality 
        img="https://img.freepik.com/free-vector/illustration-social-network-sharing-concept_53876-37154.jpg?w=2000"
        header="Community Engagement"
        body="We host book clubs, author events, and workshops to foster a sense of community among our customers."
      />
      <SingleSpeciality 
        img="https://thumb.ac-illust.com/73/73977258971c56bcea97038e2eb4cd82_t.jpeg"
        header="Convenient Shopping"
        body="Browse and shop our extensive collection online from the comfort of your home, or visit our welcoming physical store [Location] for a tactile browsing experience."
      />
    </div>
  );
}

const About = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | About us</title>
        <meta
          name="description"
          content="About Page"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        About us
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* section title with text */}
        <SectionTitleWithText
          header="Welcome To Flone"
          body="Your one-stop destination for literary treasures and captivating stories! At Flone, we believe in the transformative power of books. They have the ability to transport us to different worlds, introduce us to fascinating characters, and ignite our imaginations. Whether you're an avid reader, a casual book lover, or simply in search of that perfect gift, you've come to the right place."
          spaceTopClass="mt-100" 
          spaceBottomClass="mb-95"
        />

        <Specialities />

        {/* fun fact */}
        <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        />

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

        {/* brand logo slider */}
        <BrandLogoSliderTwo spaceBottomClass="pb-70" />
      </LayoutOne>
    </Fragment>
  );
};

About.propTypes = {
  location: PropTypes.object
};

export default About;
