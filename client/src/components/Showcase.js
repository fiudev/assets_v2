import React from "react";
import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import Header from "./shared/Header";

function ShowCaseCard(props) {
  const { card } = props;
  return (
    <a href={`/assets?tag=${card.tag}&page=1`}>
      <Card>
        <CardImg src={card.img} />
        <CardBody>
          <CardTitle>{card.category}</CardTitle>
        </CardBody>
      </Card>
    </a>
  );
}

export default class ShowCase extends React.Component {
  render() {
    const featured = [
      {
        img: require("../static/featured_branding.png"),
        category: "FIU Branding",
        tag: "branding"
      },
      {
        img: require("../static/featured_students.jpg"),
        category: "Students",
        tag: "students"
      },
      {
        img: require("../static/featured_clubs.jpg"),
        category: "Clubs",
        tag: "clubs"
      },
      {
        img: require("../static/featured_hackathons.jpg"),
        category: "Hackathons",
        tag: "hackathons"
      },
      {
        img: require("../static/featured_digisign.jpg"),
        category: "Digital Signage",
        tag: "digisign"
      },
      {
        img: require("../static/featured_wics.jpg"),
        category: "WICS",
        tag: "wics"
      }
    ];

    return (
      <React.Fragment>
        <Header text={"Featured Collection"} />
        <div className="showcase">
          {featured.map(feat => (
            <ShowCaseCard card={feat} key={feat.tag} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
