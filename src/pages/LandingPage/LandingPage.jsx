import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

// Components
import { PrimaryButton, SecondaryButton } from "../../components";

// Icons & Images
import {
  heroImage,
  formBotImg,
  userProfileImg,
  featureImg1,
  featureImg2,
} from "../../assets/images/index.js";
import {
  logoIcon,
  abstractImg1,
  abstractImg2,
  checkImg,
  crossImg,
  arrowImg,
  gmailLogo,
  monkeyLogo,
  nLogo,
  wLogo,
  wordpressLogo,
  calendarLogo,
  linkLogo,
  driveLogo,
  slackLogo,
  shopifyLogo,
  abstractLogo,
  sheetLogo,
  zapierLogo,
  roundLogo,
  salesforceLogo,
  hiddenIcon,
  teamIcon,
  linkSubTypeIcon,
  calculatorIcon,
  shareIcon,
  folderIcon,
  iBanImg,
  lemListImg,
  makerLeadImg,
  webiSharpImg,
  socialHackersImg,
  pinPointImg,
  boleImg,
  awwwsomeImg,
  redirectLinkIcon,
} from "../../assets/icons/index.js";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInButtonClick = (e) => {
    e.preventDefault();

    navigate("/login");
  };

  const handleSignUpButtonClick = (e) => {
    e.preventDefault();

    navigate("/register");
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbar}>
          <div className={styles.logoContainer}>
            <span className={styles.logoIcon}>
              <img src={logoIcon} alt="form-bot" />
            </span>
            <span className={styles.logoText}>FormBot</span>
          </div>
          <div className={styles.navlinksContainer}>
            <SecondaryButton onClick={handleSignInButtonClick}>
              Sign In
            </SecondaryButton>
            <PrimaryButton onClick={handleSignUpButtonClick}>
              Create a FormBot
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className={styles.heroContainer}>
        <div className={styles.heroContentContainer}>
          <div className={styles.abstractImgContainer}>
            <img
              className={styles.abstractImg1}
              src={abstractImg1}
              alt="form-bot"
            />
            <img
              className={styles.abstractImg2}
              src={abstractImg2}
              alt="form-bot"
            />
          </div>
          <div className={styles.heroContent}>
            <span className={styles.heroHeadingSpan}>
              Build advanced chatbots visually
            </span>
            <span className={styles.heroTextSpan}>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </span>
            <PrimaryButton
              customClass={styles.createFormFreeButton}
              onClick={handleSignUpButtonClick}
            >
              Create a FormBot for free
            </PrimaryButton>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <div className={styles.backgroundBlurContainer}>
            <span className={styles.backgroundBlurOrange}></span>
            <span className={styles.backgroundBlurBlue}></span>
          </div>
          <img src={heroImage} alt="form-bot" />
        </div>
      </div>
      <div className={styles.comparisonContainer}>
        <div className={styles.comparisonContentContainer}>
          <div className={styles.contentContainer}>
            <span className={styles.comparisonHeadingSpan}>
              Replace your old school forms with <br />
              chatbots
            </span>
            <span className={styles.comparisonTextSpan}>
              Typebot is a better way to ask for information. It leads to an
              increase in customer satisfaction and retention and multiply by
              <br />3<br /> your conversion rate compared to classical forms.
            </span>
          </div>
          <div className={styles.comparisonImgContainer}>
            <div className={styles.oldSchoolFormContainer}>
              <img src={crossImg} alt="form-bot" />
              <div className={styles.oldSchoolForm}>
                <div className={styles.inputContainer}>
                  <span>
                    Full name <span className={styles.asterisk}>*</span>
                  </span>
                  <input type="text" placeholder="Full Name" />
                </div>
                <div className={styles.inputContainer}>
                  <span>
                    Email <span className={styles.asterisk}>*</span>
                  </span>
                  <input type="text" placeholder="Email" />
                </div>
                <div className={styles.multiChoiseContainer}>
                  <span>
                    What services are you interested in?{" "}
                    <span className={styles.asterisk}>*</span>
                  </span>
                  <div className={styles.multiChoiseOption}>
                    <input type="checkbox" />
                    <span>Website Dev</span>
                  </div>
                  <div className={styles.multiChoiseOption}>
                    <input type="checkbox" />
                    <span>Content Marketing</span>
                  </div>
                  <div className={styles.multiChoiseOption}>
                    <input type="checkbox" />
                    <span>Social Media</span>
                  </div>
                  <div className={styles.multiChoiseOption}>
                    <input type="checkbox" />
                    <span>UX/UI Design</span>
                  </div>
                </div>
                <div className={styles.inputAdditionalContainer}>
                  <span>
                    Additional Information{" "}
                    <span className={styles.asterisk}>*</span>
                  </span>
                  <textarea placeholder="Additional Information" />
                </div>
                <div className={styles.submitButtonContainer}>
                  <button className={styles.submitButton}>Submit</button>
                </div>
              </div>
            </div>
            <div className={styles.formBotContainer}>
              <img src={checkImg} alt="form-bot" />
              <div className={styles.formBot}>
                <div className={styles.formBotContentContainer}>
                  <div className={styles.formBotMessages}>
                    <div className={styles.botMessageContentIcon}>
                      <img src={userProfileImg} alt="form-bot" />
                    </div>
                    <div className={styles.botMessageContent}>
                      <span className={styles.botMessageContentText}>
                        Welcome to &nbsp;{" "}
                        <span style={{ fontWeight: "bold" }}>AA</span> &nbsp;
                        (Awesome Agency)
                      </span>
                      <div className={styles.botMessageImgContainer}>
                        <img src={formBotImg} alt="form-bot" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.formBotButtonContainer}>
                    <button className={styles.formBotButton}>Hi!</button>
                  </div>
                </div>
              </div>
              <div className={styles.tryNowTextContainer}>
                <span className={styles.tryNowText}>
                  Try it out!
                  <img src={arrowImg} alt="form-bot" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.featuresContainer}>
        <div
          className={`${styles.featureCardContainer} ${styles.topFeatureCardContainer}`}
        >
          <img
            src={featureImg1}
            alt="form-bot"
            className={styles.featureCardImg}
          />
          <div className={styles.featureContentText}>
            <span className={styles.fetureHeading}>
              Easy building experience
            </span>
            <span className={styles.featureText}>
              All you have to do is drag and drop blocks to create your app.
              Even if you have custom needs, you can always add custom code.
            </span>
          </div>
        </div>
        <div
          className={`${styles.featureCardContainer} ${styles.bottomFeatureCardContainer}`}
        >
          <div className={styles.featureContentText}>
            <span className={styles.fetureHeading}>Embed it in a click</span>
            <span className={styles.featureText}>
              Embedding your typebot in your applications is a walk in the park.
              Typebot gives you several step-by-step platform- specific
              instructions. Your typebot will always feel "native".
            </span>
          </div>
          <img
            src={featureImg2}
            alt="form-bot"
            className={styles.featureCardImg}
          />
        </div>
      </div>
      <div className={styles.platformIntegrateContainer}>
        <div className={styles.platformIntegrateContentContainer}>
          <div className={styles.platformLogoContainer}>
            <div className={styles.platformLogoCardContainer}>
              <div className={styles.platformLogoCard}>
                <img src={gmailLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={monkeyLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={nLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={wLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={wordpressLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={calendarLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={linkLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={driveLogo} alt="form-bot" />
              </div>
            </div>
            <div className={styles.platformLogoCardContainer}>
              <div className={styles.platformLogoCard}>
                <img src={slackLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={shopifyLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={abstractLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={sheetLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={zapierLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={roundLogo} alt="form-bot" />
              </div>
              <div className={styles.platformLogoCard}>
                <img src={salesforceLogo} alt="form-bot" />
              </div>
            </div>
            <div className={styles.logoBlurEffect}>
              <span className={styles.blueLeftToRight}></span>
              <span className={styles.blueRightToLeft}></span>
            </div>
          </div>
          <div className={styles.platformIntegrateContent}>
            <span className={styles.platformIntegrateHeadingText}>
              Integrate with any platform
            </span>
            <span className={styles.platformIntegrateText}>
              Typebot offers several native integrations blocks as well as
              instructions on how to embed typebot on particular platforms
            </span>
          </div>
        </div>
      </div>
      <div className={styles.collectResultContainer}>
        <div className={styles.collectResultContentContainer}>
          <div className={styles.collectResultContent}>
            <span className={styles.collectResultHeadingText}>
              Collect results in real-time
            </span>
            <span className={styles.collectResultText}>
              One of the main advantage of a chat application is that you
              collect the user's responses on each question. <br />
              <b>You won't lose any valuable data.</b>
            </span>
          </div>
          <div className={styles.collectResultCardContainer}>
            <div className={styles.collectResultCard}>
              <div className={styles.collectResultCardContentContainer}>
                <div className={styles.collectResultUserIconAndChat}>
                  <div className={styles.collectResultUserIcon}>
                    <img src={userProfileImg} alt="form-bot" />
                  </div>
                  <div className={styles.collectResultUserChat}>
                    <span className={styles.userChatText}>
                      As you answer this chat, you'll see your result in the
                      real Airtable spreadsheet
                    </span>
                    <span className={styles.userChatText}>
                      You can think of it as a guestbook 😂
                    </span>
                    <span className={styles.userChatText}>Ready?</span>
                  </div>
                </div>
                <div className={styles.collectResultButtonContainer}>
                  <button className={styles.collectResultButton}>Yeah!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.moreFeaturesContainer}>
        <div className={styles.moreFeaturesContentContainer}>
          <div className={styles.moreFeaturesContent}>
            <span className={styles.moreFeaturesContentHeadingText}>
              And many more features
            </span>
            <span className={styles.moreFeaturesContentText}>
              Typebot makes form building easy and comes with powerful features
            </span>
          </div>
          <div className={styles.moreFeaturesContentCardContainer}>
            <div className={styles.moreFeaturesCard}>
              <div className={styles.moreFeaturesIconContainer}>
                <img src={hiddenIcon} alt="form-bot" />
              </div>
              <div className={styles.moreFeaturesCardContent}>
                <span className={styles.moreFeaturesCardHeadingText}>
                  Hidden fields
                </span>
                <span className={styles.moreFeaturesCardText}>
                  Include data in your form URL to segment your user and use its
                  data directly in your form.
                </span>
              </div>
            </div>
            <div className={styles.moreFeaturesCard}>
              <div className={styles.moreFeaturesIconContainer}>
                <img src={teamIcon} alt="form-bot" />
              </div>
              <div className={styles.moreFeaturesCardContent}>
                <span className={styles.moreFeaturesCardHeadingText}>
                  Team collaboration
                </span>
                <span className={styles.moreFeaturesCardText}>
                  Invite your teammates to work on your typebots with you
                </span>
              </div>
            </div>
            <div className={styles.moreFeaturesCard}>
              <div className={styles.moreFeaturesIconContainer}>
                <img src={linkSubTypeIcon} alt="form-bot" />
              </div>
              <div className={styles.moreFeaturesCardContent}>
                <span className={styles.moreFeaturesCardHeadingText}>
                  Link to sub typebots
                </span>
                <span className={styles.moreFeaturesCardText}>
                  Reuse your typebots in different parent bots.
                </span>
              </div>
            </div>
            <div className={styles.moreFeaturesCard}>
              <div className={styles.moreFeaturesIconContainer}>
                <img src={calculatorIcon} alt="form-bot" />
              </div>
              <div className={styles.moreFeaturesCardContent}>
                <span className={styles.moreFeaturesCardHeadingText}>
                  Custom code
                </span>
                <span className={styles.moreFeaturesCardText}>
                  Customize everything with your own Javascript & CSS code
                </span>
              </div>
            </div>
            <div className={styles.moreFeaturesCard}>
              <div className={styles.moreFeaturesIconContainer}>
                <img src={shareIcon} alt="form-bot" />
              </div>
              <div className={styles.moreFeaturesCardContent}>
                <span className={styles.moreFeaturesCardHeadingText}>
                  Custom domain
                </span>
                <span className={styles.moreFeaturesCardText}>
                  Connect your typebot to the custom URL of your choice
                </span>
              </div>
            </div>
            <div className={styles.moreFeaturesCard}>
              <div className={styles.moreFeaturesIconContainer}>
                <img src={folderIcon} alt="form-bot" />
              </div>
              <div className={styles.moreFeaturesCardContent}>
                <span className={styles.moreFeaturesCardHeadingText}>
                  Folder management
                </span>
                <span className={styles.moreFeaturesCardText}>
                  Organize your typebots in specific folders to keep it clean
                  and work with multiple clients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.teamsAndCreatorsContainer}>
        <div className={styles.teamsAndCreatorsContentContainer}>
          <span className={styles.teamsAndCreatorsContentHeadingText}>
            Loved by teams and creators from all around the world
          </span>
          <div className={styles.teamsAndCreatorsLogoContainer}>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={iBanImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={lemListImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={makerLeadImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={webiSharpImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={socialHackersImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={pinPointImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={boleImg} alt="form-bot" />
            </div>
            <div className={styles.teamsAndCreatorsLogo}>
              <img src={awwwsomeImg} alt="form-bot" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.improveConvContainer}>
        <img
          src={abstractImg1}
          alt="form-bot"
          className={styles.improveConvImg1}
        />
        <img
          src={abstractImg2}
          alt="form-bot"
          className={styles.improveConvImg2}
        />
        <div className={styles.improveConvContentContainer}>
          <span className={styles.improveConvHeadingText}>
            Improve conversion and user engagement with FormBots{" "}
          </span>
          <PrimaryButton
            customClass={styles.improveConvButton}
            onClick={handleSignUpButtonClick}
          >
            Create a FormBot
          </PrimaryButton>
          <span className={styles.improveConvText}>
            No trial. Generous <b>free</b> plan.
          </span>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerContentContainer}>
          <div
            className={`${styles.footerBrandContentContainer} ${styles.footerContentCard}`}
          >
            <div className={styles.logoContainer}>
              <span className={styles.logoIcon}>
                <img src={logoIcon} alt="form-bot" />
              </span>
              <span className={styles.logoText}>FormBot</span>
            </div>
            <div className={styles.footerBrantContentTextContainer}>
              Made with ❤️ by <br />
              @KChavda
            </div>
          </div>
          <div
            className={`${styles.footerProductContentContainer} ${styles.footerContentCard}`}
          >
            <span className={styles.footerProductHeadingText}>Product</span>
            <a href="#" className={styles.footerProductLinkText}>
              Status <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerProductLinkText}>
              Documentation <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerProductLinkText}>
              Roadmap <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerProductText}>
              Pricing
            </a>
          </div>
          <div
            className={`${styles.footerCommunityContentContainer} ${styles.footerContentCard}`}
          >
            <span className={styles.footerCommunityHeadingText}>Community</span>
            <a href="#" className={styles.footerCommunityLinkText}>
              Discord <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerCommunityLinkText}>
              GitHub repository <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerCommunityLinkText}>
              Twitter <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerCommunityLinkText}>
              LinkedIn <img src={redirectLinkIcon} alt="" />
            </a>
            <a href="#" className={styles.footerCommunityText}>
              OSS Friends
            </a>
          </div>
          <div
            className={`${styles.footerCompanyContentContainer} ${styles.footerContentCard}`}
          >
            <span className={styles.footerCompanyHeadingText}>Company</span>
            <a href="#" className={styles.footerCompanyLinkText}>
              About
            </a>
            <a href="#" className={styles.footerCompanyLinkText}>
              Contact
            </a>
            <a href="#" className={styles.footerCompanyLinkText}>
              Terms of Service
            </a>
            <a href="#" className={styles.footerCompanyLinkText}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
