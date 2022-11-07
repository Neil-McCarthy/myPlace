const languagesIconList = document.getElementsByTagName("main")[0].getElementsByTagName("span")[0].getElementsByTagName("img");
const learningDisplaySections = document.getElementById("learningDisplay").getElementsByTagName("section");

const learningData = [
    {
        name: "JavaScript",
        overview: "Overview of js",
        level: "level of js",
        implementation: "what you've done with js",
        futurePlans: "what you hope to do with js"
    },
    {
        name: "React",
        overview: "Overview of react",
        level: "level of react",
        implementation: "what you've done with react",
        futurePlans: "what you hope to do with react"
    },
    {
        name: "C#",
        overview: "Overview of C#",
        level: "level of js",
        implementation: "what you've done with C#",
        futurePlans: "what you hope to do with C#"
    },
    {
        name: "MySQL",
        overview: "Overview of mySQL",
        level: "level of mySQL",
        implementation: "what you've done with mySQL",
        futurePlans: "what you hope to do with mySQL"
    }
]

for (let singleIcon = 0;singleIcon < languagesIconList.length;singleIcon++) {
    languagesIconList[singleIcon].onclick = () => {
        learningDisplaySections[0].getElementsByTagName("h1")[0].innerHTML = learningData[singleIcon].name;
        learningDisplaySections[0].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].overview;
        learningDisplaySections[1].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].level;
        learningDisplaySections[2].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].implementation;
        learningDisplaySections[3].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].futurePlans;
    };
}