import Link from "next/link";

const PrivacyAndPolicyPage = () => {
  return (
    <div className="bg-darkPrimary min-h-screen text-white">
      <div className="p-4 max-w-xl mx-auto">
        <Link href="/" className="">
          ⬅️ Back
        </Link>
        <div className="space-y-4 mt-10 leading-7">
          <h1 className="text-3xl font-bold">Privacy And Policy</h1>
          <p>
            At FitiTrack, we understand the importance of your privacy.
            That&apos;s why we&apos;ve made it our mission to protect your
            personal information and ensure that your data is handled with the
            utmost care and respect.
          </p>
          <p>
            When you use our application, we may collect certain information
            from you, such as your name and email address. However, we only
            gather this data when it&apos;s necessary to provide you with the
            services you&apos;ve requested. We&apos;re transparent about what
            we&apos;re collecting and how we plan to use it.
          </p>
          <p>
            Your data is stored securely, and we go to great lengths to prevent
            loss, theft, unauthorized access, disclosure, copying, or
            modification. We don&apos;t share your personal information with any
            third parties, unless required by law.
          </p>
          <p>
            As a data controller and processor, we comply with all applicable
            data protection laws, including the EU&apos;s General Data
            Protection Regulation (GDPR). We take our responsibilities seriously
            and are committed to safeguarding your privacy.
          </p>
          <p>
            While our website may contain links to external sites, please note
            that we have no control over their content or privacy practices. We
            encourage you to review the policies of any site you visit to ensure
            that you&apos;re comfortable with how they handle your information.
          </p>
          <p>
            You have the right to refuse our request for your personal
            information, but please understand that this may limit the services
            we can provide you. By continuing to use our website, you&apos;re
            agreeing to our privacy practices.
          </p>
          <p>
            If you have any questions or concerns about how we manage user data
            and personal information, feel free to reach out to us. This policy
            is effective as of August 23, 2024.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicyPage;
