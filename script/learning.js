const languagesIconList = document.getElementsByTagName("main")[0].getElementsByTagName("span")[0].getElementsByTagName("img");
const learningDisplaySections = document.getElementById("learningDisplay").getElementsByTagName("section");

const learningData = [
    {
        name: "JavaScript",
        overview: `When I was learning JavaScript in college for the first time I remember thinking, when will I ever use this clunky backwards language? Now I can't imagine making anything without it. What was once double Dutch
        has now become the best means for me to get what I have in my head onto a website. It's an incredibly functional language and, while it's not flawless, it feels near limitless in what it allows you to do and I
        now thoroughly enjoy using it on a daily basis.`,
        level: `I've been using this language for years now and every few weeks I feel as if I'm close to mastering it, only to find some new extension of JavaScript that I'd never heard of or a new and better way of doing
        somthing that puts my code to shame. But I think that's fantastic, knowing that there's still so much to do and learn with this language. It's like reading your favourite book and every time you get close to the end
        another 10 chapters appear out of nowhere.\nI'd be confident enough to say that I'm past the beginning stages of this language. My code is clearer, more concise, and more trimmed down. I'm more able to create whatever
        I'd like and if I'm not then I've got a good process for working it out. Yet while I'm very proud of where I've gotten with it so far I'm very much looking forward to taking it even further.`,
        implementation: `I've used JavaScritp in all of the websites I've done. A lot of the time it's for making a page seem animated by adding something that responds to the users scrolling, clicks or input, but a lot of i
        would be working in the background too to make the site easier to use and more accessible to the user. Things like local storage to remember a users input when going from page to page, or adding smoother transitions
        when changing the content of a page to make the update less jaring.\nI made several 2D games using only JavaScript and while on one side they take up a lot of time and can cause quite a headache, what I was
        able to learn through making them has prooved invaluable. Managing mutiple objects at once and doing so effectively, dealing with multiple user inputs at once, being able to properly events that were happening between
        different objects (collisions, respawns, relative direction), plus a whole host of other factors that came into to play when making these. They may not be groundbreaking games but they were fantastic learning tools.\nThe
        latest thing I've been using within JavaScript is accessing bulk information in a JSON file through an API. To those that are familiar with this I'm sure it seems a bit simple but for me who was storing all of this info
        in dozens of differnt variables or in enormous objects, this was pretty game changing. I've only just started using this and am only doing so as a library of data but I'm looking forward to seeing what I can do with it
        in time.`,
        futurePlans: `To me, JavaScript is the easiest and best way for me to interact with a website and I have absolutely no intention of stopping or slowing down my using of it. I'm pretty happy with how I use it now but 
        considering that looking at the quality of sites or projects I did only a few months ago has me close to tears, it's pretty safe to say an evolution is inevitable.\nI don't have any specific goals in mind with this language
        aside from integrating other languages with it (especially more back-end languages) but there's always a new project with a something I haven't done before just around the corner. `
    },
    {
        name: "React",
        overview: `The first time I started using React I thought, "What a useless waste of time?". I had already been creating and updating elements live through vanillaJavaScript, I could write a function that could create
        multiple elements on the fly, so what did React have to offer? Then I shut up and slowly realised just howamazing React actually is to use. Suddenly what used to take dozens of lines of code that was difficult to read,
        had become only a few lines that were simple tounderstand. Has completely changed my approach to front-end development.\nAlthough I'm still little more than a novice, I'm looking forward to seeing what else React has
        to offer.`,
        level: `I'm not really sure I'm qualified to give a definitive answer on this. On the one hand I feel like there are some things in React that I do really well and I'm pretty happy with my projects, so it would be nice
        to say that I'm great and leave it at that. Yet on the other hand I know that in probably only a matter of months or even weeks I'll look back at the work I'm doing today and my brain will melt as I try to understand
        what I was thinking.\nI think a fair assessment would be that I'm still a novice but a pretty decent novice. There's still a lot that I don't understand or a lot that I'm doing wrong but what I get right isn't too bad.`,
        implementation: `Most of my dealings with React so far have all been quite similar, a website that can display a number of different options depending on users input using useState. I've yet to really sink my teeth
        into a project in a big way or really tackle some convoluted idea.\nBut what I have done has really helped my understanding of how React is used. Best practice when updating state, when to (and when Not to) create a
        new component, and when to fall back on vanilla JavaScript have all been prominent lessons in each of the sites I've made with React.\nI plan on diving into some more complicated projects in the near future and will
        be happy to update this once I have, but until then this will have to do.`,
        futurePlans: `Hopefully a lot!\nI'm becoming much more confident with React and I hope to find work in a team soon where I can learn a great deal more of it. It's an excellent framework and one I'd like to use in
        standard practice once I'm skilled enough.\nAs for specific projects, I have two that I'm looking forawrd to getting back to and finishing, a webpage builder and a recipe page, but I have no doubt another idea
        will pop into my head before finishing either!`
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

function delay() {
    return new Promise(resolve => setTimeout(resolve, 750));
}
for (let singleIcon = 0;singleIcon < languagesIconList.length;singleIcon++) {
    languagesIconList[singleIcon].onclick = async () => {
        document.getElementById("learningDisplay").style.opacity = 0;
        delay().then(() => {
        learningDisplaySections[0].getElementsByTagName("h1")[0].innerHTML = learningData[singleIcon].name;
        learningDisplaySections[0].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].overview;
        learningDisplaySections[1].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].level;
        learningDisplaySections[2].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].implementation;
        learningDisplaySections[3].getElementsByTagName("p")[0].innerHTML = learningData[singleIcon].futurePlans;
        document.getElementById("learningDisplay").style.opacity = 1;
        });
    };
}