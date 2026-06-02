# FAQ

This page collects common questions about the NTCIR-19 ModelRetrieval task. Use the quick links or expand individual questions to read answers.

## Getting Started

This page highlights Top Questions and a searchable list of all FAQs below.

<!-- Top questions quick access -->

<!-- Filter box -->
<input id="faq-filter" placeholder="Filter questions (type keywords)..." aria-label="Filter FAQ">

## All Questions

<!-- Linked TOC -->

- [FAQ](#faq)
  - [Getting Started](#getting-started)
  - [All Questions](#all-questions)
    - [Top Questions](#top-questions)
    - [Getting Started](#getting-started-1)
    - [Data \& Evaluation](#data--evaluation)
    - [Contact](#contact)

<!-- FAQ items (each wrapped so JS can filter) -->
<!-- Group: Getting Started -->

### Top Questions

<div class="faq-top-questions">
  <div class="faq-card"><button type="button" data-target="register" aria-controls="register">How do I register for the task?</button></div>
  <div class="faq-card"><button type="button" data-target="dataset" aria-controls="dataset">Where is the dataset and how do I access it?</button></div>
  <div class="faq-card"><button type="button" data-target="format" aria-controls="format">What is the required submission format?</button></div>
  <div class="faq-card"><button type="button" data-target="deadline" aria-controls="deadline">When are submissions due?</button></div>
</div>

### Getting Started

<section class="faq-item" id="register">
  <h4>How do I register for the task?</h4>
  <p>Registration is handled through the NTCIR-19 website. Visit the registration page and follow the instructions.</p>
  <p><a class="md-button md-button--primary" href="https://research.nii.ac.jp/ntcir/ntcir-19/howto.html">NTCIR-19 Registration</a></p>
</section>

<section class="faq-item" id="participant-todo">
  <h4>What do I need to do after registration?</h4>
  <p>After registering, prepare and submit your run files for the subtask(s) you registered for by the submission deadlines. Important dates (tentative):</p>
  <ul>
    <li><strong>Normal submission:</strong> August 1, 2026</li>
    <li><strong>Paper (draft) due:</strong> September 1, 2026</li>
    <li><strong>Late submission:</strong> October 15, 2026</li>
    <li><strong>Camera-ready paper due:</strong> November 1, 2026</li>
    <li><strong>NTCIR-19 conference:</strong> December 8–10, 2026 (Tokyo)</li>
  </ul>
  <p>The exact submission site and instructions will be announced later</p>
</section>

<section class="faq-item" id="paper-submission">
  <h4>What are the paper submission instructions?</h4>
  <p>Please follow the NTCIR paper guidelines: <a href="https://research.nii.ac.jp/ntcir/ntcir-19/papers.html">NTCIR-19 paper instructions</a>.</p>
</section>

<section class="faq-item" id="dataset">
  <h4>Where is the dataset and how do I access it?</h4>
  <p>Links to the task data repositories are listed on the <a href="data.md">Dataset &amp; Resources</a> page. For Subtask A (Language Models) and Subtask B (Style Transfer), see the linked GitHub repositories on the <a href="data.md">Data</a> page.</p>
</section>

<section class="faq-item" id="format">
  <h4>What is the required submission format?</h4>
  <p>Submissions must use TREC_EVAL format with up to 5 runs per participant. Each line uses the format:</p>
  <pre><code>topicID Q0 docID Rank Score RunID</code></pre>
  <p>Check the <a href="tasks.md">Task Definition</a> page for examples.</p>
</section>

<section class="faq-item" id="deadline">
  <h4>When are submissions due?</h4>
  <p>Check the <a href="schedule.md">Schedule</a> for the latest timeline.</p>
</section>

### Data & Evaluation

<section class="faq-item" id="input-data-a">
  <h4>What is the Input and Output for Sub Task A?</h4>
  <p>Input: training and validation data for a downstream text classification task (JSONL format with text–label pairs). Output: a ranked list of candidate pre-trained BERT models ordered by their expected F1 score on the hidden test set (highest first).</p>
</section>

<section class="faq-item" id="method-data-a">
  <h4>What can I use to predict ranked list in Sub Task A?</h4>
  <p>Available resources include the training queries (with full train/validation/test and ground-truth model rankings) and the test queries (only train/validation; test is hidden). Participants may use candidate models (e.g., compute embeddings, evaluate on validation data, or fine-tune) to produce features or predicted scores. If you fine-tune or otherwise use candidate models on the provided data, describe this methodology clearly in your paper.</p>
</section>

<section class="faq-item" id="data-creation-a">
  <h4>How was the groundtruth data created of for Subtask A?</h4>
  <p>For each query and candidate model pair, the model was fine-tuned on the task's training set, with early stopping based on validation performance. Final performance was measured on the held-out test set; candidate models were then ranked by test F1 score (descending). See the Task Definition page for full fine-tuning settings.</p>
</section>

<section class="faq-item" id="input-data-b">
  <h4>What is the Input and Output for Sub Task B?</h4>
  <p>Input: a query image representing a desired style. Output: a ranked list of candidate Image Style Transfer LoRA models. Each query has a single ground-truth model (the one used to generate images); higher rank for the ground-truth model improves MRR.</p>
</section>

<section class="faq-item" id="method-data-b">
  <h4>What can I use to predict ranked list in Sub Task B</h4>
  <p>You may use the query image and the training image–model pairs to build retrieval models or similarity measures that predict which LoRA model best matches the query style.</p>
</section>

### Contact

<section class="faq-item" id="contact">
  <h4>Who should I contact for questions not covered here?</h4>
  <p>Please contact the organizers listed on the <a href="organizers.md">Organizers</a> page. For quick help, email <code>modelretrieval1-organizers[at]googlegroups.com</code>.</p>
</section>
