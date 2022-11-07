const languagesIconList = document.getElementsByTagName("main")[0].getElementsByTagName("span")[0].getElementsByTagName("img");
const learningDisplaySections = document.getElementById("learningDisplay").getElementsByTagName("section");

const learningData = [
    {
        name: "JavaScript",
        overview: "Overview of js",
        implementation: "what you've done with js",
        level: "level of js",
        futurePlans: "what you hope to do with js"
    },
    {
        name: "React",
        overview: "Overview of react",
        implementation: "what you've done with react",
        level: "level of react",
        futurePlans: "what you hope to do with react"
    },
    {
        name: "C#",
        overview: "Overview of C#",
        implementation: "what you've done with C#",
        level: "level of js",
        futurePlans: "what you hope to do with C#"
    },
    {
        name: "MySQL",
        overview: "Overview of mySQL",
        implementation: "what you've done with mySQL",
        level: "level of mySQL",
        futurePlans: "what you hope to do with mySQL"
    }
]

for (let singleIcon = 0;singleIcon < languagesIconList.length;singleIcon++) {
    languagesIconList[singleIcon].onclick = () => {
        learningDisplaySections[0].getElementsByTagName("h1")[0].innerHTML = learningData[singleIcon].name;
        learningDisplaySections[0].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].overview;
        learningDisplaySections[1].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].implementation;
        learningDisplaySections[2].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].level;
        learningDisplaySections[3].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].futurePlans;
    };
}