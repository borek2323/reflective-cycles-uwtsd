/* MODEL DATA — edit academic content here only.
   Source: Cambridge University Libraries, Models of reflection,
   Reflective Practice Toolkit. (https://libguides.cam.ac.uk/reflectivepracticetoolkit/models)
   Keep wording as close, concise paraphrases of that source.
   Model descriptions may contain links to the references below. */

const MODELS = {
  era: {
    name: "ERA Cycle",
    description:
      'The ERA cycle described by Jasper <a href="#ref-2">[2]</a> is a simple three-stage model of reflection: Experience, Reflection and Action.',
    diagram: {
      src: "images/era.png",
      alt: "ERA cycle showing Experience, Reflection and Action.",
      figureNumber: 1,
      caption:
        "Three-stage reflective cycle moving from Experience to Reflection to Action.",
      citation: {
        label: "[1]",
        href: "#ref-1"
      }
    },
    stages: [
      {
        title: "Experience",
        prompts: [
          "Describe the experience. It may be something you have been through before or something new, and it may be positive or negative."
        ]
      },
      {
        title: "Reflection",
        prompts: [
          "Think through what happened. What are your feelings about the experience, and what do you consider the next steps to be?"
        ]
      },
      {
        title: "Action",
        prompts: [
          "What action will you take as a result of this experience?"
        ]
      }
    ]
  },
  driscoll: {
    name: "Driscoll's What Model",
    description:
      'Driscoll\'s model <a href="#ref-3">[3]</a> uses three questions derived from the reflective approach discussed in <a href="#ref-4">[4]</a>: What?, So what? and Now what?',
    diagram: {
      src: "images/driscoll.png",
      alt: "Driscoll's What Model showing What?, So what? and Now what?.",
      figureNumber: 2,
      caption:
        "Three-stage reflective model structured around What?, So what? and Now what?",
      citation: {
        label: "[1]",
        href: "#ref-1"
      }
    },
    stages: [
      {
        title: "What?",
        prompts: [
          "Describe the situation or experience to set it in context."
        ]
      },
      {
        title: "So what?",
        prompts: [
          "What did you learn as a result of the experience?"
        ]
      },
      {
        title: "Now what?",
        prompts: [
          "What action will you take as a result of this reflection? You might change a behaviour, try something new, or continue as you are. It is also valid to decide that no change is needed."
        ]
      }
    ]
  },
  kolb: {
    name: "Kolb's Experiential Learning Cycle",
    description:
      'Kolb\'s experiential learning model <a href="#ref-5">[5]</a> describes learning from experience in four stages: concrete experience, reflective observation, abstract conceptualization and active experimentation.',
    diagram: {
      src: "images/kolb.png",
      alt: "Kolb's experiential learning cycle showing concrete experience, reflective observation, abstract conceptualisation and active experimentation.",
      figureNumber: 3,
      caption:
        "Four-stage experiential learning cycle moving through concrete experience, reflective observation, abstract conceptualisation and active experimentation.",
      citation: {
        label: "[1]",
        href: "#ref-1"
      }
    },
    stages: [
      {
        title: "Concrete experience",
        displayTitle: "Concrete experience (from current term)",
        prompts: [
          "Describe the experience, whether it is new or a repeat of something that has happened before."
        ]
      },
      {
        title: "Reflective observation",
        prompts: [
          "Reflect on the experience and note anything about it which you have not come across before."
        ]
      },
      {
        title: "Abstract conceptualization",
        prompts: [
          "What new ideas are you developing as a result? If something unexpected happened, why might that be?"
        ]
      },
      {
        title: "Active experimentation",
        prompts: [
          "How might you apply your new ideas to different situations?"
        ]
      }
    ]
  },
  gibbs: {
    name: "Gibbs' Reflective Cycle",
    description:
      'Gibbs\' Reflective Cycle <a href="#ref-6">[6]</a> has six stages: description, feelings, evaluation, analysis, conclusion and action plan.',
    diagram: {
      src: "images/gibbs.png",
      alt: "Gibbs' Reflective Cycle showing Description, Feelings, Evaluation, Analysis, Conclusion and Action plan.",
      figureNumber: 4,
      caption:
        "Six-stage reflective cycle moving through Description, Feelings, Evaluation, Analysis, Conclusion and Action plan.",
      citation: {
        label: "[1]",
        href: "#ref-1"
      }
    },
    stages: [
      {
        title: "Description",
        prompts: [
          "Outline the experience you are reflecting on."
        ]
      },
      {
        title: "Feelings",
        prompts: [
          "What were your feelings about the experience, both during it and after?"
        ]
      },
      {
        title: "Evaluation",
        prompts: [
          "What was good or bad about the experience from your point of view?"
        ]
      },
      {
        title: "Analysis",
        prompts: [
          "Analyse the situation. Can you make sense of it?"
        ]
      },
      {
        title: "Conclusion",
        prompts: [
          "What other actions, if any, could you have taken to reach a different outcome?"
        ]
      },
      {
        title: "Action plan",
        prompts: [
          "What steps will you take the next time you find yourself in a similar situation?"
        ]
      }
    ]
  }
};

const modelSelect = document.getElementById("model-select");
const modelPanel = document.getElementById("model-panel");
const modelName = document.getElementById("model-name");
const modelDescription = document.getElementById("model-description");
const modelDiagram = document.getElementById("model-diagram");
const stageProgress = document.getElementById("stage-progress");
const stagesContainer = document.getElementById("stages");
const btnBack = document.getElementById("btn-back");
const btnContinue = document.getElementById("btn-continue");
const btnGenerate = document.getElementById("btn-generate");
const outputPanel = document.getElementById("output-panel");
const outputHeading = document.getElementById("output-heading");
const outputContent = document.getElementById("output-content");
const btnCopy = document.getElementById("btn-copy");
const btnEdit = document.getElementById("btn-edit");
const btnReset = document.getElementById("btn-reset");
const copyStatus = document.getElementById("copy-status");

const DISCARD_MESSAGE =
  "This will remove your current responses from this page. Continue?";

function selectedModel() {
  return MODELS[modelSelect.value] || null;
}

function stageSections() {
  return stagesContainer.querySelectorAll(".stage");
}

function visibleStageIndex() {
  const sections = stageSections();
  for (let i = 0; i < sections.length; i += 1) {
    if (!sections[i].hidden) {
      return i;
    }
  }
  return 0;
}

function hasResponses() {
  return Array.from(stagesContainer.querySelectorAll("textarea")).some(
    function (textarea) {
      return textarea.value.trim().length > 0;
    }
  );
}

function confirmDiscard() {
  if (!hasResponses()) {
    return true;
  }
  return window.confirm(DISCARD_MESSAGE);
}

function populateSelect() {
  Object.keys(MODELS).forEach(function (id) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = MODELS[id].name;
    modelSelect.appendChild(option);
  });
}

function currentModelId() {
  return modelPanel.dataset.modelId || "";
}

function restoreSelect() {
  modelSelect.value = currentModelId();
}

function renderDiagram(model) {
  modelDiagram.replaceChildren();

  if (!model.diagram) {
    return;
  }

  const figure = document.createElement("figure");
  figure.className = "model-diagram";

  const image = document.createElement("img");
  image.src = model.diagram.src;
  image.alt = model.diagram.alt;

  const caption = document.createElement("figcaption");
  const captionText = model.diagram.caption.endsWith(".")
    ? model.diagram.caption.slice(0, -1)
    : model.diagram.caption;
  caption.appendChild(
    document.createTextNode(
      "Figure " +
        model.diagram.figureNumber +
        ". " +
        model.name +
        ". " +
        captionText +
        " "
    )
  );

  const citation = document.createElement("a");
  citation.href = model.diagram.citation.href;
  citation.textContent = model.diagram.citation.label;
  caption.append(citation, document.createTextNode("."));

  figure.append(image, caption);
  modelDiagram.appendChild(figure);
}

function renderModel(modelId) {
  const model = MODELS[modelId];
  modelPanel.dataset.modelId = modelId;
  modelName.textContent = model.name;
  modelDescription.innerHTML = model.description;
  renderDiagram(model);
  stagesContainer.replaceChildren();

  model.stages.forEach(function (stage, index) {
    const section = document.createElement("section");
    section.className = "stage";
    if (index !== 0) {
      section.hidden = true;
    }

    const textareaId = "response-" + index;

    const heading = document.createElement("h3");
    heading.id = "stage-heading-" + index;
    heading.tabIndex = -1;
    heading.textContent = stage.displayTitle || stage.title;

    const prompts = document.createElement("ul");
    prompts.className = "prompts";
    stage.prompts.forEach(function (promptText) {
      const item = document.createElement("li");
      item.textContent = promptText;
      prompts.appendChild(item);
    });

    const label = document.createElement("label");
    label.htmlFor = textareaId;
    label.className = "visually-hidden";
    label.textContent = stage.displayTitle || stage.title;

    const textarea = document.createElement("textarea");
    textarea.id = textareaId;
    textarea.rows = 8;

    section.append(heading, prompts, label, textarea);
    stagesContainer.appendChild(section);
  });

  outputPanel.hidden = true;
  copyStatus.textContent = "";
  modelPanel.hidden = false;
  updateStageView(0, false);
}

function clearWorkspace() {
  modelSelect.value = "";
  delete modelPanel.dataset.modelId;
  stagesContainer.replaceChildren();
  outputContent.replaceChildren();
  modelDiagram.replaceChildren();
  copyStatus.textContent = "";
  modelName.textContent = "";
  modelDescription.textContent = "";
  stageProgress.textContent = "";
  modelPanel.hidden = true;
  outputPanel.hidden = true;
}

function updateStageView(index, moveFocus) {
  const sections = stageSections();
  const lastIndex = sections.length - 1;

  sections.forEach(function (section, sectionIndex) {
    section.hidden = sectionIndex !== index;
  });

  stageProgress.textContent = "Stage " + (index + 1) + " of " + sections.length;
  btnBack.disabled = index === 0;
  btnContinue.hidden = index === lastIndex;
  btnGenerate.hidden = index !== lastIndex;

  if (moveFocus) {
    const heading = sections[index].querySelector("h3");
    heading.focus();
  }
}

function plainReflection() {
  const model = selectedModel();
  const textareas = stagesContainer.querySelectorAll("textarea");
  const lines = [model.name, ""];

  model.stages.forEach(function (stage, index) {
    lines.push(stage.title);
    lines.push(textareas[index].value);
    lines.push("");
  });

  return lines.join("\n").replace(/\n+$/, "\n");
}

function renderOutput() {
  const model = selectedModel();
  const textareas = stagesContainer.querySelectorAll("textarea");

  outputHeading.textContent = model.name;
  outputContent.replaceChildren();

  model.stages.forEach(function (stage, index) {
    const block = document.createElement("div");
    block.className = "output-block";

    const heading = document.createElement("h3");
    heading.textContent = stage.title;

    const body = document.createElement("p");
    body.textContent = textareas[index].value;

    block.append(heading, body);
    outputContent.appendChild(block);
  });
}

function showOutput() {
  renderOutput();
  modelPanel.hidden = true;
  outputPanel.hidden = false;
  copyStatus.textContent = "";
  outputHeading.focus();
}

function copyReflection() {
  const text = plainReflection();

  function copied() {
    copyStatus.textContent = "Reflection copied.";
  }

  function copyFailed() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(outputContent);
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent =
      "Copy was not available. Select the text on this page and copy it.";
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(copied).catch(function () {
      fallbackCopy(text, copied, copyFailed);
    });
    return;
  }

  fallbackCopy(text, copied, copyFailed);
}

function fallbackCopy(text, onSuccess, onFailure) {
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "0";
  helper.style.left = "0";
  document.body.appendChild(helper);
  helper.select();
  helper.setSelectionRange(0, helper.value.length);

  let succeeded = false;
  try {
    succeeded = document.execCommand("copy");
  } catch (error) {
    succeeded = false;
  }

  helper.remove();

  if (succeeded) {
    onSuccess();
  } else {
    onFailure();
  }
}

populateSelect();

modelSelect.addEventListener("change", function () {
  const nextId = modelSelect.value;

  if (!nextId) {
    if (!confirmDiscard()) {
      restoreSelect();
      return;
    }
    clearWorkspace();
    return;
  }

  if (stagesContainer.querySelector("textarea") && !confirmDiscard()) {
    restoreSelect();
    return;
  }

  renderModel(nextId);
});

btnBack.addEventListener("click", function () {
  const index = visibleStageIndex();
  if (index > 0) {
    updateStageView(index - 1, true);
  }
});

btnContinue.addEventListener("click", function () {
  const index = visibleStageIndex();
  const sections = stageSections();
  if (index < sections.length - 1) {
    updateStageView(index + 1, true);
  }
});

btnGenerate.addEventListener("click", function () {
  showOutput();
});

btnCopy.addEventListener("click", function () {
  copyReflection();
});

btnEdit.addEventListener("click", function () {
  outputPanel.hidden = true;
  copyStatus.textContent = "";
  modelPanel.hidden = false;
  const heading = stagesContainer.querySelector(".stage:not([hidden]) h3");
  if (heading) {
    heading.focus();
  }
});

btnReset.addEventListener("click", function () {
  if (!confirmDiscard()) {
    return;
  }
  clearWorkspace();
  modelSelect.focus();
});
