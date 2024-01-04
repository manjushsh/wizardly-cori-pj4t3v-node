const express = require("express");
const { HfInference } = require("@huggingface/inference");
const Constants = require("../services/constants");

const router = express.Router();

/* Post for V1 */
router.post("/img_gen_v1", async function (req, res, _) {
  const { HF_ACCESS_TOKEN } = process.env;
  const { prompt, negetivePrompt } = req.body;
  const inference = new HfInference(HF_ACCESS_TOKEN);

  try {
    const input =
      '&lt;p style="text-align:left"&gt;&lt;span&gt;&lt;b&gt;Our Purpose&lt;/b&gt;&lt;/span&gt;&lt;/p&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;p style="text-align:left"&gt;We work to connect and power an inclusive, digital economy that benefits everyone, everywhere by making transactions safe, simple, smart and accessible. Using secure data and networks, partnerships and passion, our innovations and solutions help individuals, financial institutions, governments and businesses realize their greatest potential. Our decency quotient, or DQ, drives our culture and everything we do inside and outside of our company. We cultivate a &lt;a href="https://www.mastercard.us/en-us/vision/who-we-are/diversity-inclusion.html" target="_blank"&gt;culture of inclusion&lt;/a&gt; for all employees that respects their individual strengths, views, and experiences. We believe that our differences enable us to be a better team – one that makes better decisions, drives innovation and delivers better business results.&lt;/p&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;p style="text-align:left"&gt;&lt;b&gt;Title and Summary&lt;/b&gt;&lt;/p&gt;&lt;h3&gt;&lt;/h3&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;Senior Specialist, Product Management&lt;h3&gt;&lt;/h3&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;Senior Specialist, Product Management  - Commercial Solutions &lt;br&gt;&lt;br&gt;Join us in unlocking infinite opportunity in Mastercard’s Commercial Solutions organization! &lt;br&gt; &lt;br&gt;In Commercial Solutions, we empower our customer’s businesses to succeed through innovative, trusted payment solutions that deliver a seamless digital-first experience around the world. We are disrupting the industry by developing world-class travel and B2B solutions for our corporate clients around the globe. &lt;br&gt;&lt;br&gt;As a key player in our organization’s digital transformation journey, you will play a critical role in revolutionizing the global financial ecosystem. You will have the opportunity to make data-driven decisions, build first-in-class corporate solutions, and partner with industry-leaders to build cloud-native products and solutions for our clients.&lt;br&gt;&lt;br&gt;Role Overview: &lt;br&gt;o\tServe as a product subject matter expert and collaborate with product operations and external clients to deliver innovative solutions &lt;br&gt;o\tNavigates products through their lifecycle guided by the Studio framework:&lt;br&gt;o\tPayments strategy: Identify strategic product “plays” and E2E approach to capture growth&lt;br&gt;o\tMarket Understanding: Develop deep understanding of customers, payments ecosystems, competitors, regulatory environments&lt;br&gt;o\tPricing and commercialization: Develop strategy to maximize sustainable revenue growth providing forecasts to enable planning&lt;br&gt;o\tGo to market approach: Deep understanding of customer and ecosystem needs focused on value exchange and product readiness&lt;br&gt;o\tPerform go-to-market activities by closely partnering with program management, global and regional leadership, finance, operations, legal, compliance, etc. &lt;br&gt;o\tPartner with Engineering colleagues to create robust roadmaps that include all of the work required to bring a product to market focused on (i.e., commercialization and pricing plan; product readiness; delivery model; servicing model; sales enablement)&lt;br&gt;o\tEmbody the “Mastercard Way” through creating value, growing together and moving fast&lt;br&gt;o\tProduce product documentation including user guides, product overviews and training materials &lt;br&gt;o\tOperates with minimal supervision and able to make informed, well-reasoned decisions independently&lt;br&gt;o\tThrives in an environment that is fast-paced, rapidly changing, and customer-oriented&lt;br&gt;&lt;br&gt;Required Experience: &lt;br&gt;o\tBachelor\'s degree or relevant professional experience&lt;br&gt;o\tPrevious experience with product development or management&lt;br&gt;o\tExperience deploying new product(s) to the cloud, or managing existing product(s) in the cloud&lt;br&gt;o\tMust be able to demonstrate that you have a basic understanding of software engineering or technology (e.g., cloud, database, SQL or analytics tools)&lt;br&gt;o\tExperience working in Agile and with engineering scrums&lt;br&gt;o\tSharp analytical and problem-solving skills &lt;br&gt;o\tStrong leadership, interpersonal and communication skills &lt;br&gt;o\tThe ability to work collaboratively with others in cross-functional teams to implement and assess the operational impact of changes to process and procedures &lt;br&gt;o\tExperience in presenting and communicating complex/detailed topics.&lt;br&gt;o\tStrong process orientation and a solid understanding of project management techniques, methodologies, and best practices&lt;br&gt;o\tStrong ability to multi-task, organize, manage, and implement complex projects whether directly or through supervision&lt;br&gt;&lt;br&gt;Nice To Have: &lt;br&gt;o\tExperience working within the commercial card space or corporate banking &lt;br&gt;o\tExperience with one, or more, of the categories:&lt;br&gt;o\tExpense Reporting software&lt;br&gt;o\tB2B or B2C web applications&lt;br&gt;o\tApplication localization&lt;br&gt;o\tiOS and Android native mobile applications&lt;br&gt;o\tBusiness Intelligence solutions&lt;br&gt;o\tAbility to identify points of failure and formulate error-handling approaches for product resiliency &lt;br&gt;o\tAbility to identify, assess, and manage tradeoffs&lt;br&gt;&lt;br&gt;What we offer&lt;br&gt;In line with Mastercard’s total compensation philosophy, the successful candidate will be offered a competitive base salary based on location, experience and other qualifications for the role and may be eligible   for an annual bonus depending on the role. Mastercard also provides health and wellness benefits, access to retirement savings including a best-in-class company match, gender-inclusive benefits and more!&lt;h3&gt;&lt;/h3&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;h3&gt;&lt;/h3&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;p style="text-align:left"&gt;&lt;b&gt;Corporate Security Responsibility&lt;/b&gt;&lt;/p&gt;&lt;p style="text-align:left"&gt;&lt;br /&gt;All activities involving access to Mastercard assets, information, and networks comes with an inherent risk to the organization and, therefore, it is expected that every person working for, or on behalf of, Mastercard is responsible for information security and must:&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;p style="text-align:left"&gt;Abide by Mastercard’s security policies and practices;&lt;/p&gt;&lt;/li&gt;&lt;li&gt;&lt;p style="text-align:left"&gt;Ensure the confidentiality and integrity of the information being accessed;&lt;/p&gt;&lt;/li&gt;&lt;li&gt;&lt;p style="text-align:left"&gt;Report any suspected information security violation or breach, and&lt;/p&gt;&lt;/li&gt;&lt;li&gt;&lt;p style="text-align:left"&gt;Complete all periodic mandatory security trainings in accordance with Mastercard’s guidelines.&lt;/p&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;br /&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;br /&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;&lt;br /&gt;&lt;p style="text-align:inherit"&gt;&lt;/p&gt;';
    const response = await inference.textGeneration({
      model: Constants.MICROSOFT_PHI2,
      inputs:
        Constants.DEFAULT_INSTRUCTION +
        `<|user|>HTML sanitized string: ${input}
      </s>
      <|assistant|>`,
      parameters: {
        // negative_prompt: negetivePrompt || "blurry",
      },
    });
    return res.send({ data: response });
  } catch (err) {
    console.debug("Caught error: ", err);
    return res.status(500).send({ error: err });
  }
});