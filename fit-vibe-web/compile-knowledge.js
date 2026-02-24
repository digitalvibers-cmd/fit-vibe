const fs = require('fs');
const path = require('path');

const stepsDir = '/Users/buco/.gemini/antigravity/brain/0db865ec-7047-45df-860e-3655d7b703f8/.system_generated/steps';
const outputDir = path.join('/Users/buco/Desktop/Antygravity apps/Fit Vibe/fit-vibe-web', 'src', 'knowledge-base');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let compiledText = "# Fit Vibe Knowledge Base (from NotebookLM)\n\n";

// Add the inline ones from steps 97 and 99 that weren't saved to files
const inlineSources = [
    { "title": "How to Use Heavy Duty Resistance Bands With Dumbbells", "content": "I'm Andrew Sadek personal trainer at the Houstonian Club and this is how to use heavy duty resistance bands with dumbbells now whether you use a heavy duty resistance band loop or a traditional resistance band with handles utilizing the band with the dumbbells dramatically increases the intensity of the exercise by increasing the resistance as the body's levers decrease the resistance from the dumbbell this can best be seen with the bicep curl begin with a medium weighted pair of dumbbells in each hand and grasp the handle of the band while anchoring the band with the foot or both feet if you need extra resistance as you curl up you'll notice that the weight from the dumbbell gets easier once you pass 90 degrees but the resistance from the band increases dramatically towards the top of the motion this can also be seen with the chest press with the same position you've got a dumbbell and the handle of the band in each hand and you're going to press with the anchor of the band looping underneath the bench these are excellent ways to use heavy-duty resistance bands with dumbbells" },
    { "title": "MuscleWiki - Free Exercise Library | Interactive Muscle Map", "content": "Generator Try it out now\n\nMuscleWiki - Free Exercise Library | Interactive Muscle Map\n\nGenerator" }
];

for (const source of inlineSources) {
    compiledText += `## ${source.title}\n${source.content}\n\n`;
}

// Read the saved outputs
const stepDirs = fs.readdirSync(stepsDir);
for (const stepDir of stepDirs) {
    const file = path.join(stepsDir, stepDir, 'output.txt');
    if (fs.existsSync(file)) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const json = JSON.parse(content);
            if (json.status === "success" && json.content) {
                compiledText += `## ${json.title}\n${json.content}\n\n`;
            }
        } catch (e) {
            // Ignore parse errors or non-json files
        }
    }
}

const outputPath = path.join(outputDir, 'fitness-knowledge.md');
fs.writeFileSync(outputPath, compiledText);
console.log('Compiled knowledge base to: ' + outputPath);
