import React, { useState } from "react";
import {
  Card,
  Box,
  Stack,
  CardBody,
  Heading,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import handsImg from "../../assets/hands.jpg";
import blogsImg2 from "../../assets/blogsImg2.jpg";
import bloodDayImg2 from "../../assets/bloodDayImg.jpg";
import factorsImg from "../../assets/factors.jpg";
import conceptImg from "../../assets/concept.jpg";
import girlImg from "../../assets/girlImg.jpg";
import Sidebar from "../../components/Sidebar";
import { useTranslation } from "react-i18next";

function BlogsFeature() {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const {t} = useTranslation();
  const handleTextToggle = () => {
    setIsTextVisible(isTextVisible);
  };

  return (
    <>
      <Sidebar />
      <Box m="0 auto" w="65%" pr={"10"} mt={"95px"}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          display="flex"
          justify="space-between"
          mt="15px"
          onClick={handleTextToggle}
          style={{ cursor: "pointer" }}
          maxH="150px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px" fontSize="smaller">
              {t("BlogHeader1")}
              </Heading>
              <Link fontWeight="bold" cursor="pointer">
                Donate the Gift of Life for Christmas
              </Link>

              {isTextVisible && (
                <Text py="2">
                  With hospitals facing a nationwide blood shortage this holiday
                  season, the Town of Oyster Bay invites residents to attend a
                  Blood Collection Drive on Wednesday, December 27, from 1 p.m.
                  to 7 p.m. at the Hicksville Athletic Center, located at 167 S.
                  Broadway in Hicksville. Town Councilman Lou Imbroto stated,
                  “Blood supplies are critically needed for local hospitals to
                  meet the demand and continue saving lives this holiday season.
                  Please consider participating in this blood drive to help
                  bolster our blood banks and ensure as many people as possible
                  can be helped. Together, we can give the holiday gift of life
                  though a simple blood donation.” Appointments are preferred
                  for the Town’s Blood Drive. To qualify as a donor, a person
                  must be between the ages of 17 and 75 years old (16 with
                  parental permission and 76 or older with a doctor’s note),
                  weigh at least 110 pounds and not have donated blood within
                  the last 56 days. Anyone who received a tattoo within the past
                  12 months is ineligible to donate. It is recommended that
                  donors eat well (low fat) and drink fluids in the days before
                  the Blood Drive. Additionally, all donors will receive a
                  voucher for a free Blizzard at Dairy Queen. Town Supervisor
                  Joseph Saladino added, “It’s quick, easy, and safe to donate a
                  single pint of blood which can save up to three lives.
                  Donating blood at the Hicksville Athletic Center, is an
                  incredible way for all of us to pitch in and give back, to
                  help ease the burden of our Healthcare Heroes as they continue
                  to provide lifesaving efforts.”
                </Text>
              )}

              <Text color="gray" py="2" size="sm" fontSize="smaller">
                {t("BlogDate1")}
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={girlImg}
            alt="Caffe Latte"
          />
        </Card>
        {/* <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
          onClick={handleTextToggle}
          style={{ cursor: "pointer" }}
          maxH="150px"
          display="flex"
          justify="space-between"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px" fontSize="smaller">
              {t("BlogHeader2")}
              </Heading>
              <Heading size="sm">{t("BlogHeading2")}</Heading>

              {isTextVisible && (
                <Text py="2">
                  A few weeks ago I was given the opportunity to partake in a
                  case study for the Australian Red Cross Lifeblood service; an
                  online booking service in which users schedule appointments to
                  donate blood. The blood donation service can be a very
                  unfamiliar territory for someone who is automatically
                  ineligible, like me. However as a budding UX designer, this is
                  the perfect opportunity to prove how confident and versatile I
                  am when designing something that can have an actual social
                  impact. Thankfully I’m not working alone. I was paired with
                  two knowledgeable, fellow UX designers who have their finger
                  on the pulse (yep, pun intended); Janie Ngan Pham , who has a
                  background in marketing and Kathy Ta , who has a background in
                  an agile product team for an engineering company. Red Cross
                  Australia’s Situation To better understand the problem, I need
                  to dive deep into the social relationships with donating blood
                  — starting with the statistics. Blood is a finite and
                  temporary resource that’s in constant high-demand, and in
                  order to keep the supply up, we’d need over 31,000 donations a
                  week. According to an article in abc.net.au , Lifeblood
                  Australia experiences over 1,000 cancellations every week. To
                  put these numbers into perspective; Australia’s current
                  population sits at 25.3 million. one-in-three Australians will
                  need a blood donation in their lifetime, while only one in 30
                  (3%) give blood every year. Each donation of blood is
                  equivalent to roughly 470ml and can save up to three lives and
                  a person can donate once every 12 weeks, which can equivalent
                  to up to 4 times a year. Furthermore, an article published in
                  June, 2018 on perthnow.com, shows a staggering 91,000
                  Australians who gave blood for the first time in the previous
                  12 months did not return to make a second donation. That’s 43%
                  of donors who didn’t return after their first appointment.
                  Remember, 2018 was a time before the COVID-19 outbreak. As I
                  write this article in Melbourne; a highly populated city
                  oscillating between vigilant lockdown and cautionary
                  socialisation; the COVID-19 outbreak contributes it’s own
                  subset of variables and potential friction points. Before I
                  could start designing solutions, I wanted to narrow down
                  questions surrounding people’s experiences when donating
                  blood. At this early point in the design research process, I
                  decided it wasn’t worth excluding people based on their
                  frequency of donating blood. My intention behind this was to
                  identify characteristics between regular and irregular donors.
                  Exploration I started with a survey to get quantitative data
                  and a sneak peek into the minds of people and their motivation
                  behind donating blood. The online survey asked questions
                  ranging between what motivated a user to donate the first
                  time, what prompts a user to donate, and even questions
                  exploring why a user has had to cancel their appointment. I
                  also held in-depth interviews with individuals asking their
                  motivation and constraints when booking and fulfilling an
                  appointment with Lifeblood.
                </Text>
              )}

              <Text color="gray" py="2" size="sm" fontSize="smaller">
              {t("BlogDate2")}
              </Text>
            </CardBody>
          </Stack>
          <Image
          
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={conceptImg}
            alt="Caffe Latte"
          />
        </Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          display="flex"
          justify="space-between"
          mt="15px"
          onClick={handleTextToggle}
          style={{ cursor: "pointer" }}
          maxH="150px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px" fontSize="smaller">
              {t("BlogHeader3")}
              </Heading>
              <Heading size="sm">{t("BlogHeading3")}</Heading>

              {isTextVisible && (
                <Text py="2">
                  Blood donation refers to the voluntary act of giving blood,
                  typically through a medical facility or blood bank. The
                  donated blood is then used for various purposes, including
                  transfusions to patients in need or further processing for
                  specific components like platelets or plasma. Types of blood
                  donations There are different types of blood donations, each
                  serving a specific purpose. Whole blood donation is the most
                  common type, where a pint (around 470 ml) of blood is
                  collected. Other forms include platelet donation, plasma
                  donation, and double red cell donation, which focuses on
                  specific blood components required for certain medical
                  treatments. Eligibility criteria To ensure the safety and
                  well-being of both the donor and recipient, certain
                  eligibility criteria are in place. Donors must meet age,
                  weight, and health requirements, which are assessed through a
                  screening process. Factors like recent travel, medical
                  history, and lifestyle choices are taken into consideration to
                  determine the eligibility of a potential donor. The
                  Significance of Blood Donation Blood donation holds immense
                  significance due to its life-saving potential and its role in
                  treating various medical conditions. Here are some key reasons
                  why blood donation is crucial. Life-saving potential The
                  availability of an adequate and timely blood supply can be a
                  matter of life and death for many individuals. Donated blood
                  is essential for treating patients with severe injuries,
                  undergoing surgeries, and those with medical conditions that
                  require regular transfusions, such as thalassemia and
                  leukemia. By donating blood, individuals contribute directly
                  to saving lives and giving hope to those in critical need.
                  Treating medical conditions Blood and its components play a
                  vital role in the treatment of various medical conditions. For
                  instance, platelets are crucial for individuals with bleeding
                  disorders, while plasma is used to create life-saving
                  medications for patients with immune deficiencies. Blood
                  donation ensures that an adequate supply of these components
                  is available for medical treatments and therapies. Supporting
                  surgeries and emergencies Surgeries, especially those
                  involving significant blood loss, rely heavily on blood
                  transfusions. In emergencies such as accidents or natural
                  disasters, the availability of a ready blood supply becomes
                  even more critical. By donating blood, individuals contribute
                  to the availability of blood units that can be quickly
                  accessed during these urgent situations, ensuring timely and
                  effective medical interventions. The Process of Blood Donation
                  Pre-donation preparation Before donating blood, certain
                  preparations are necessary. Donors are advised to have a good
                  meal, stay hydrated, and get adequate rest before the
                  donation. It is essential to disclose any recent illnesses,
                  medications, or travel to ensure the safety of the donor and
                  the recipient. Blood collection The blood collection process
                  is relatively simple and usually takes around 10–15 minutes. A
                  healthcare professional will cleanse the donor’s arm and
                  insert a sterile needle to draw blood into a collection bag.
                  The collected blood is then carefully handled and processed to
                  ensure its safety and suitability for transfusion.
                  Post-donation care After blood donation, donors are provided
                  with refreshments and advised to rest for a short period. It
                  is essential to follow the instructions given by healthcare
                  professionals and avoid strenuous activities for a few hours.
                  Donors may experience mild dizziness or fatigue, which
                  typically subsides quickly. Ensuring Safety and Quality
                  Screening and testing To maintain the safety and quality of
                  donated blood, rigorous screening and testing protocols are
                  followed. Donors are screened for various infectious diseases,
                  such as HIV, hepatitis, and syphilis, to prevent any potential
                  transmission. Additionally, blood units are tested for
                  compatibility, blood type, and other factors to ensure
                  suitability for transfusion. Donor confidentiality Donor
                  confidentiality is a crucial aspect of blood donation.
                  Personal and medical information provided by donors is treated
                  with strict confidentiality. Blood banks and medical
                  facilities adhere to privacy regulations and ensure that donor
                  information is protected and used only for the purpose of
                  blood donation and related procedures. Hygiene and sterility
                  Blood collection centers and medical facilities adhere to
                  strict hygiene and sterility standards to prevent
                  contamination or infection. Sterile equipment, disposable
                  needles, and proper sanitation protocols are in place to
                  maintain the safety and well-being of both donors and
                  recipients. Raising awareness By graciously giving a portion
                  of ourselves, we possess the ability to rescue lives and
                  enhance the well-being of numerous individuals is crucial to
                  encourage more individuals to participate. Educational
                  campaigns, community drives, and social media initiatives can
                  help spread knowledge about the impact of blood donation and
                  dispel myths or misconceptions surrounding the process.
                  Community drives and campaigns Organizing blood donation
                  drives in communities, workplaces, or educational institutions
                  can significantly boost blood donation rates. By making
                  donation facilities easily accessible and creating a
                  supportive environment, more people can be motivated to
                  contribute to this noble cause. Incentives and rewards
                  Incentives and rewards can serve as a motivating factor for
                  potential donors. Providing small tokens of appreciation, such
                  as certificates or recognition, can acknowledge the generosity
                  of donors and encourage their continued participation.
                  Overcoming Common Concerns Fear of needles and pain Many
                  individuals may have a fear of needles or experience anxiety
                  related to the blood donation process. Healthcare
                  professionals are trained to handle such concerns and ensure a
                  comfortable experience for donors. Open communication and
                  reassurance can help alleviate fears and make the process more
                  manageable. Health risks Blood donation is a safe process with
                  minimal health risks for eligible donors. Healthcare
                  professionals thoroughly assess the donor’s health and provide
                  guidance to ensure their well-being. Donors are encouraged to
                  disclose any health concerns or discomfort during the
                  screening process. Time commitment The time commitment
                  involved in blood donation is relatively minimal compared to
                  the significant impact it can have. The entire process,
                  including pre-donation preparation, the donation itself, and
                  post-donation recovery, usually takes around an hour or
                  slightly more. Conclusion Blood donation is a powerful act of
                  compassion and solidarity. It plays a vital role in saving
                  lives, treating medical conditions, and supporting emergency
                  situations. By donating blood, individuals contribute directly
                  to the well-being of others and make a positive impact on
                  their communities. It is crucial to raise awareness, address
                  concerns, and encourage more people to participate in this
                  life-saving endeavor.
                </Text>
              )}

              <Text color="gray" py="2" size="sm" fontSize="smaller">
              {t("BlogDate3")}
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={handsImg}
            alt="Caffe Latte"
          />
        </Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          display="flex"
          justify="space-between"
          mt="15px"
          onClick={handleTextToggle}
          style={{ cursor: "pointer" }}
          maxH="150px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px" fontSize="smaller">
                {t("BlogHeader4")}
              </Heading>
              <Heading size="sm">
                {t("BlogHeading4")}
              </Heading>

              {isTextVisible && (
                <Text py="2">
                  Doctors around the world use blood supplies for various
                  conditions: blood or bone marrow disease, cancer, anemia,
                  heart, kidney, and stomach disease, traumatic injuries in
                  emergencies, disasters and accidents, etc. Regular blood
                  donations are needed all around the world to ensure safe,
                  timely, and quality-assured blood supplies. With the ongoing
                  pandemic, despite limited mobility and other challenges, the
                  need for donations of blood and blood products is still
                  constant and ongoing. Healthy individuals can still donate and
                  the highest standards of safety and infection control are
                  followed. The theme of the global public health campaign this
                  year is “Give blood and keep the world beating”. It emphasizes
                  the major contribution of blood donors who keep the world
                  pulsating by saving lives and improving people’s health. A
                  highlight of this year’s campaign will be the young people who
                  play a driving role in ensuring a safe blood supply thanks to
                  their idealism, enthusiasm and creativity. In many countries,
                  they are organizing activities and initiatives to encourage
                  blood donation and to raise awareness. As part of this year’s
                  campaign, the objectives are to: Thank blood donors worldwide
                  and raise public awareness of the need for regular, unpaid
                  blood donations. Promote the values of blood donation in
                  enhancing community solidarity and social cohesion. Encourage
                  young people to embrace the humanitarian call to donate blood
                  and motivate others to do the same. Celebrate the potential of
                  youth as partners in promoting health. Italy and its National
                  Blood Centre in Rome are the hosts for World Blood Donor Day
                  2021. Did you know? 1 blood donation could save up to 3 lives.
                  About 1 in 7 patients entering a hospital will need blood
                  About every 2 seconds someone needs blood Blood from 1
                  donation can be divided into 2 components: red blood cells and
                  plasma. The average adult has about 10 pints (about 5 liters)
                  of blood, but a typical whole-blood donation is only 1 pint.
                  O-negative blood is considered a ‘universal’ blood type
                  because it can be given to people of all blood types. Blood
                  centers often run short of types O and B red blood cells. Red
                  blood cells have a short shelf life. They only last for 6
                  weeks (42 days), which is why donating regularly is so
                  important There is no substitute for human blood because blood
                  cannot be manufactured — it can only come from generous donors
                  Donating whole blood takes only about 10–15 minutes. A healthy
                  donor can donate whole blood every 56 days If you began
                  donating blood at age 18 and donated every 90 days until you
                  reached 60, you would have donated at least 112 liters of
                  blood, potentially helping save more than 500 lives!
                </Text>
              )}

              <Text color="gray" py="2" size="sm" fontSize="smaller">
                {t("BlogDate4")}
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={bloodDayImg2}
            alt="Caffe Latte"
          />
        </Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          display="flex"
          justify="space-between"
          mt="15px"
          onClick={handleTextToggle}
          style={{ cursor: "pointer" }}
          maxH="150px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px" fontSize="smaller">
              {t("Blog5")}
              </Heading>
              <Heading size="sm">
              {t("BlogHeading5")}
              </Heading>

              {isTextVisible && (
                <Text py="2">
                  Abstract Background and Objectives. This study was conducted
                  to assess the level of intention of the general public towards
                  blood donation and the factors associated with it. Methods. A
                  descriptive cross-sectional study was conducted in South-East
                  Botswana amongst participants aged 21–65 years. An
                  interviewer-administered questionnaire was completed for 384
                  participants. Results. Of the 384 participants, 104 (27.1%)
                  reported that they had donated blood in the past and 269
                  (70.1%) stated that they were willing to donate blood in the
                  future. Thirteen out of the 104 past donors (12.5%) reported
                  that they had donated blood in the 12 months preceding the
                  survey and only 10 (9.6%) participants reported that they have
                  been regular donors. In the backward logistic regression
                  analysis, the variables that remained significant predictors
                  of the intention to donate blood were secondary education
                  (adjusted odds ratio (AOR) (95% confidence interval (CI)):
                  2.92 (1.48, 5.77)), tertiary education (AOR (95% CI): 3.83
                  (1.52, 9.62)), and knowing a family member who had ever
                  donated blood (AOR (95% CI): 2.84 (1.58, 5.12)). Conclusion.
                  Being informed about blood transfusion and its life-saving
                  benefits through either the education system or the experience
                  made people more likely to intend to donate blood.
                  Evidence-based interventions to retain blood donors as regular
                  donors are recommended. 1. Introduction Blood transfusion is
                  becoming a crucial component in the management of patients
                  presenting with accident injuries, surgical conditions,
                  malignancies, pregnancy complications, and other medical
                  conditions [1, 2]. In high income countries, the major
                  indications for transfusion include sophisticated medical and
                  surgical procedures, malignancies, and trauma. Pregnancy
                  complications and childhood anemia are the conditions that
                  largely need blood transfusion in middle and low income
                  countries. More than one-quarter of maternal deaths could be
                  averted by having access to safe blood [2–4]. WHO estimates
                  that at least 1% of the population needs to donate blood to
                  meet the minimum requirement of blood for a country [1].
                  Globally, 70 countries have a blood donation level less than
                  the optimal level of 10/1000 population [1]. The African
                  continent managed to collect blood to satisfy only 41% of the
                  demand in 2006 [5, 6]. The gap between supply and demand for
                  blood is wider in developing and transitional countries than
                  in developed counterparts [1, 2]. According to Botswana
                  National Blood Transfusion Services (NBTS), the country needs
                  36,000 units of blood annually. Records show that 23,275 units
                  of blood were collected in the year 2009 followed by a
                  reduction to 20,401 units collected in 2010 and 16,562 units
                  collected in 2011 (unpublished report by Botswana NBTS, 2012).
                  Altruism, social responsibility, peer influence, access to
                  health communication, and knowledge about importance of blood
                  donation are mentioned as some of the factors that motivate
                  individuals to donate blood [7–12]. Transmission of values to
                  generations among family members practicing donation and the
                  influence of active blood donors on others are also noted [12,
                  13]. The retention of blood donors as regular donors is
                  critical to ensure regular supply of blood which is influenced
                  by a range of factors, namely, demographic, psychosocial,
                  altruism, social obligation, prior donation frequency,
                  satisfaction with the last donation experience, and behavioral
                  factors [14–18]. Studies have demonstrated that the intention
                  to donate blood predicts the practice of blood donation [18,
                  19]. Demographic, knowledge status, and behavioral factors are
                  shown to determine individuals’ intention to donate blood
                  [20–22]. Hence, it is worthwhile to study the intention of
                  community members for blood donation in Botswana to understand
                  the situation and come up with evidence-based interventions.
                  This study was conducted to assess the level of intention of
                  the general public in South-East Botswana towards blood
                  donation and the factors associated with the intention. 2.
                  Methods 2.1. Study Site and Study Population A descriptive
                  cross-sectional study was conducted in Kweneng district in
                  South-East Botswana. The population of the district was
                  estimated to be 304,674 with a density of 6.4 people per
                  square kilometer [23]. The study participants were recruited
                  from Molepolole village which is the capital of Kweneng
                  district with a population of 67,598 [23]. The study was
                  conducted amongst members in the selected households in
                  Molepolole. They were aged 21–65 years irrespective of gender.
                  2.2. Sample Size and Sampling Epi-Info software version 3.5.3
                  (US CDC, Atlanta, Georgia) was utilized to compute the sample
                  size. The proportion of the intention to donate blood was
                  assumed to be 50% to attain the maximum sample size. With a
                  margin of error of 5% at 5% level of significance, a sample
                  size of 384 was determined. EPI-random walk method [24] was
                  used to select the households. The starting point was selected
                  at Kgosing, the office for local leaders (at the center of the
                  village). A bottle was spun and households along the direction
                  of the bottle top were included in the data collection. One
                  eligible member in each selected household was interviewed
                  until reaching the required sample size. If there were more
                  than one eligible person in the selected household, only one
                  randomly selected participant was included using lottery
                  method. 2.3. Data Collection and Analysis A questionnaire was
                  developed in English after a thorough literature review to
                  include the relevant variables. It was then pilot tested and
                  validated. Two enumerators trained on the questionnaire
                  collected the data. The principal investigators were involved
                  in the supervision of the data collection. Data were collected
                  between August 27 and September 21, 2012. In this study, a
                  regular blood donor was a person who voluntarily donated blood
                  routinely, that is, 2–4 times a year [1]. Data were entered
                  using Epi-Info software version 3.5.3 and exported to SPSS
                  version 20 (IBM, NY, USA) for analysis. Frequency, percentage,
                  and mean were computed to describe the findings. The crude and
                  adjusted odds ratio (COR/AOR) and 95% confidence intervals
                  (CI) were analyzed to explore associations. Backward logistic
                  regression analysis was employed to control the effect of
                  confounding variables. values less than 0.05 were considered
                  statistically significant. 2.4. Ethical Issues Ethical
                  approval was secured from the Institutional Review Boards of
                  the University of Botswana and the Ministry of Health Research
                  Unit of Botswana. The District Health Management Team and the
                  local administrators granted permission to conduct the
                  research. Signed consent was obtained from all participants
                  before the conduct of the interview. No personal identifying
                  details were recorded on the questionnaire.
                </Text>
              )}

              <Text color="gray" py="2" size="sm" fontSize="smaller">
              {t("BlogDate5")}
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={factorsImg}
            alt="Caffe Latte"
          />
        </Card> */}
      </Box>
    </>
  );
}

export default BlogsFeature;
