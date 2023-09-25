import React, { useEffect, useState } from "react";
import PresidentCard from "./PresidentCard";
import { Button } from "react-bootstrap";
import "./presidents.css"

function Presidents() {

    const presidents = [
        {
            id: 1,
            president: 1,
            nm: "George Washington",
            pp: "None, Federalist",
            tm: "1789-1797",
            image: "https://images.unsplash.com/photo-1585076800588-77e0884c3191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTgwOTN8MHwxfHNlYXJjaHwxfHxwcmVzaWRlbnQlMjBnZW9yZ2UlMjB3YXNoaW5ndG9ufGVufDB8fHx8MTY5MDUxMTA3NHww&ixlib=rb-4.0.3&q=80&w=1080"
        },
        {
            id: 2,
            president: 2,
            nm: "John Adams",
            pp: "Federalist",
            tm: "1797-1801",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/02-adams.jpg"
        },
        {
            id: 3,
            president: 3,
            nm: "Thomas Jefferson",
            pp: "Democratic-Republican",
            tm: "1801-1809",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/03-jefferson.jpg"
        },
        {
            id: 4,
            president: 4,
            nm: "James Madison",
            pp: "Democratic-Republican",
            tm: "1809-1817",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/04-madison.jpg"
        },
        {
            id: 5,
            president: 5,
            nm: "James Monroe",
            pp: "Democratic-Republican",
            tm: "1817-1825",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/05-monroe.jpg"
        },
        {
            id: 6,
            president: 6,
            nm: "John Quincy Adams",
            pp: "Democratic-Republican",
            tm: "1825-1829",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/06-adams.jpg"
        },
        {
            id: 7,
            president: 7,
            nm: "Andrew Jackson",
            pp: "Democrat",
            tm: "1829-1837",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/07-jackson.jpg"
        },
        {
            id: 8,
            president: 8,
            nm: "Martin van Buren",
            pp: "Democrat",
            tm: "1837-1841",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/08-van-buren.jpg"
        },
        {
            id: 9,
            president: 9,
            nm: "William H. Harrison",
            pp: "Whig",
            tm: "1841",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/09-harrison.jpg"
        },
        {
            id: 10,
            president: 10,
            nm: "John Tyler",
            pp: "Whig",
            tm: "1841-1845",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/10-tyler.jpg"
        },
        {
            id: 11,
            president: 11,
            nm: "James K. Polk",
            pp: "Democrat",
            tm: "1845-1849",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/11-polk.jpg"
        },
        {
            id: 12,
            president: 12,
            nm: "Zachary Taylor",
            pp: "Whig",
            tm: "1849-1850",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/12-taylor.jpg"
        },
        {
            id: 13,
            president: 13,
            nm: "Millard Fillmore",
            pp: "Whig",
            tm: "1850-1853",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/13-fillmore.jpg"
        },
        {
            id: 14,
            president: 14,
            nm: "Franklin Pierce",
            pp: "Democrat",
            tm: "1853-1857",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/14-pierce.jpg"
        },
        {
            id: 15,
            president: 15,
            nm: "James Buchanan",
            pp: "Democrat",
            tm: "1857-1861",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/15-buchanan.jpg"
        },
        {
            id: 16,
            president: 16,
            nm: "Abraham Lincoln",
            pp: "Republican",
            tm: "1861-1865",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/16-lincoln.jpg"
        },
        {
            id: 17,
            president: 17,
            nm: "Andrew Johnson",
            pp: "National Union",
            tm: "1865-1869",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/17-johnson.jpg"
        },
        {
            id: 18,
            president: 18,
            nm: "Ulysses S. Grant",
            pp: "Republican",
            tm: "1869-1877",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/18-grant.jpg"
        },
        {
            id: 19,
            president: 19,
            nm: "Rutherford Hayes",
            pp: "Republican",
            tm: "1877-1881",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/19-hayes.jpg"
        },
        {
            id: 20,
            president: 20,
            nm: "James Garfield",
            pp: "Republican",
            tm: "1881",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/20-garfield.jpg"
        },
        {
            id: 21,
            president: 21,
            nm: "Chester Arthur",
            pp: "Republican",
            tm: "1881-1885",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/21-arthur.jpg"
        },
        {
            id: 22,
            president: 22,
            nm: "Grover Cleveland",
            pp: "Democrat",
            tm: "1885-1889",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/22-24-cleveland.jpg"
        },
        {
            id: 23,
            president: 23,
            nm: "Benjamin Harrison",
            pp: "Republican",
            tm: "1889-1893",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/23-harrison.jpg"
        },
        {
            id: 24,
            president: 24,
            nm: "Grover Cleveland",
            pp: "Democrat",
            tm: "1893-1897",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/22-24-cleveland.jpg"
        },
        {
            id: 25,
            president: 25,
            nm: "William McKinley",
            pp: "Republican",
            tm: "1897-1901",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/25-mckinley.jpg"
        },
        {
            id: 26,
            president: 26,
            nm: "Theodore Roosevelt",
            pp: "Republican",
            tm: "1901-1909",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/26-roosevelt.jpg"
        },
        {
            id: 27,
            president: 27,
            nm: "William Taft",
            pp: "Republican",
            tm: "1909-1913",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/27-taft.jpg"
        },
        {
            id: 28,
            president: 28,
            nm: "Woodrow Wilson",
            pp: "Democrat",
            tm: "1913-1921",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/28-wilson.jpg"
        },
        {
            id: 29,
            president: 29,
            nm: "Warren Harding",
            pp: "Republican",
            tm: "1921-1923",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/29-harding.jpg"
        },
        {
            id: 30,
            president: 30,
            nm: "Calvin Coolidge",
            pp: "Republican",
            tm: "1923-1929",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/30-coolidge.jpg"
        },
        {
            id: 31,
            president: 31,
            nm: "Herbert C. Hoover",
            pp: "Republican",
            tm: "1929-1933",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/31-hoover.jpg"
        },
        {
            id: 32,
            president: 32,
            nm: "Franklin Delano Roosevelt",
            pp: "Democrat",
            tm: "1933-1945",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/32-roosevelt.jpg"
        },
        {
            id: 33,
            president: 33,
            nm: "Harry S Truman",
            pp: "Democrat",
            tm: "1945-1953",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/33-truman.jpg"
        },
        {
            id: 34,
            president: 34,
            nm: "Dwight David Eisenhower",
            pp: "Republican",
            tm: "1953-1961",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/34-eisenhower.jpg"
        },
        {
            id: 35,
            president: 35,
            nm: "John Fitzgerald Kennedy",
            pp: "Democrat",
            tm: "1961-1963",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/35-kennedy.jpg"
        },
        {
            id: 36,
            president: 36,
            nm: "Lyndon Baines Johnson",
            pp: "Democrat",
            tm: "1963-1969",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/36-johnson.jpg"
        },
        {
            id: 37,
            president: 37,
            nm: "Richard Milhous Nixon",
            pp: "Republican",
            tm: "1969-1974",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/37-nixon.jpg"
        },
        {
            id: 38,
            president: 38,
            nm: "Gerald R. Ford",
            pp: "Republican",
            tm: "1974-1977",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/38-ford.jpg"
        },
        {
            id: 39,
            president: 39,
            nm: "Jimmy Carter",
            pp: "Democrat",
            tm: "1977-1981",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/39-carter.jpg"
        },
        {
            id: 40,
            president: 40,
            nm: "Ronald Wilson Reagan",
            pp: "Republican",
            tm: "1981-1989",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/40-reagan.jpg"
        },
        {
            id: 41,
            president: 41,
            nm: "George H. W. Bush",
            pp: "Republican",
            tm: "1989-1993",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/41-bush.jpg"
        },
        {
            id: 42,
            president: 42,
            nm: "Bill Clinton",
            pp: "Democrat",
            tm: "1993-2001",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/42-clinton.jpg"
        },
        {
            id: 43,
            president: 43,
            nm: "George W. Bush",
            pp: "Republican",
            tm: "2001-2009",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/43-bush.jpg"
        },
        {
            id: 44,
            president: 44,
            nm: "Barack Obama",
            pp: "Democrat",
            tm: "2009-2017",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/44-obama.jpg"
        },
        {
            id: 45,
            president: 45,
            nm: "Donald Trump",
            pp: "Republican",
            tm: "2017-2021",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/45-donald-trump.png"
        },
        {
            id: 46,
            president: 46,
            nm: "Joseph R. Biden Jr.",
            pp: "Democrat",
            tm: "2021-",
            image: "https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/46-joe-biden.png"
        },
        {
            id: 47,
            president: 47,
            nm: "Barnett Fisher",
            pp: "Known for fireside chats of code.",
            tm: "Present",
            image: "https://media.licdn.com/dms/image/C4D03AQFoMdSxaptBow/profile-displayphoto-shrink_200_200/0/1653317883763?e=1695859200&v=beta&t=BtwH-EAEMBiVarIDyJDok-Gyby_2QL6naIkfUCaKDnE"
        }
    ];
    //#end region

    const [presidentsData, setPresidentsData] = useState({
        data: [],
        presidentsComponents: [],
    });
   
    useEffect(() => {
        let arrayOfPrez = presidents;
        setPresidentsData((prevState) => {
            let prezCopy = { ...prevState };
            prezCopy.data = arrayOfPrez;
            prezCopy.presidentsComponents = arrayOfPrez.map(prezMap);
            return prezCopy;
        });
    }, []);

    const prezMap = (aPrezObj) => {
        return (
            <PresidentCard  //on FriendMap const aNewCard = props.friend
                prez={aPrezObj} key={aPrezObj.id} />
        );
    };

    function prezFilter(party) {

        if (party === "Reset") {
            setPresidentsData((prevState) => {
                let copyPrez = { ...prevState };
                copyPrez.presidentsComponents = prevState.data.map(prezMap);
                return copyPrez;
            });
        }
        else {
            const filteredPrez = presidentsData.data.filter((party) => party.pp === "Democrat");
            const filteredByParty = filteredPrez.map(prezMap);
            setPresidentsData((prevState) => {
                let newFilteredObj = { ...prevState };
                newFilteredObj.presidentsComponents = filteredByParty;
                return newFilteredObj;
            });
        }
    };

    return (
        <div className="container">
            <h1>Presidents Map</h1>
            <Button className="filterDemocrat" id="Democrat" variant="success" onClick={() => prezFilter("Democrat")}>Filter Democrats
            </Button>
            <Button className="resetPresident" id="Reset" variant="primary" onClick={() => prezFilter("Reset")}>Reset Presidents
            </Button>
            <div className="row">{presidentsData.presidentsComponents}

            </div>
        </div>
    )
};

export default Presidents;
