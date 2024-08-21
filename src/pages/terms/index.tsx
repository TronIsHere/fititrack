import Link from "next/link";

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-darkPrimary min-h-screen text-white">
      <div className="p-4 max-w-xl mx-auto">
        <Link href="/" className="">
          ⬅️ Back
        </Link>
        <div className="space-y-4 mt-10 leading-7">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <h2 className="text-2xl font-bold">1. Introduction</h2>
          <p>
            By using FitiTrack, you confirm your acceptance of, and agree to be
            bound by, these terms and conditions.
          </p>
          <h2 className="text-2xl font-bold">
            2. Agreement to Terms and Conditions
          </h2>
          <p>
            This Agreement takes effect on the date on which you first use the
            FitiTrack application.
          </p>
          <h2 className="text-2xl font-bold">
            3. Unlimited Access Software License with Termination Rights
          </h2>
          <p>
            The FitiTrack Software License facilitates the acquisition of
            FitiTrack software through a single purchase, granting users
            unrestricted and perpetual access to its comprehensive
            functionalities. Tailored for individuals tracking their daily
            fitness and wellness journeys, FitiTrack empowers users to create
            personalized dashboards and track their progress over time.
          </p>
          <p>
            This license entails a straightforward and flexible arrangement,
            exempting users from recurring fees or subscriptions. However, it is
            important to acknowledge that the licensor retains the right to
            terminate the license without conditions or prerequisites. This
            termination provision enables the licensor to exercise control over
            software distribution and utilization.
          </p>
          <p>
            Opting for the FitiTrack Software License enables users to enjoy the
            benefits of the software while recognizing the licensor&apos;s
            unrestricted termination rights, which provide adaptability and
            address potential unforeseen circumstances.
          </p>
          <h2 className="text-2xl font-bold">5. Disclaimer</h2>
          <p>
            It is not warranted that FitiTrack will meet your requirements or
            that its operation will be uninterrupted or error-free. All express
            and implied warranties or conditions not stated in this Agreement
            (including without limitation, loss of profits, loss or corruption
            of data, business interruption or loss of contracts), so far as such
            exclusion or disclaimer is permitted under the applicable law are
            excluded and expressly disclaimed. This Agreement does not affect
            your statutory rights.
          </p>
          <h2 className="text-2xl font-bold">
            6. Warranties and Limitation of Liability
          </h2>
          <p>
            FitiTrack does not give any warranty, guarantee or other term as to
            the quality, fitness for purpose or otherwise of the software.
            FitiTrack shall not be liable to you by reason of any representation
            (unless fraudulent), or any implied warranty, condition or other
            term, or any duty at common law, for any loss of profit or any
            indirect, special or consequential loss, damage, costs, expenses or
            other claims (whether caused by FitiTrack&apos;s negligence or the
            negligence of its servants or agents or otherwise) which arise out
            of or in connection with the provision of any goods or services by
            FitiTrack. FitiTrack shall not be liable or deemed to be in breach
            of contract by reason of any delay in performing, or failure to
            perform, any of its obligations if the delay or failure was due to
            any cause beyond its reasonable control. Notwithstanding contrary
            clauses in this Agreement, in the event that FitiTrack are deemed
            liable to you for breach of this Agreement, you agree that
            FitiTrack&apos;s liability is limited to the amount actually paid by
            you for your services or software, which amount calculated in
            reliance upon this clause. You hereby release FitiTrack from any and
            all obligations, liabilities and claims in excess of this
            limitation.
          </p>
          <h2 className="text-2xl font-bold">7. Responsibilities</h2>
          <p>
            FitiTrack is not responsible for what the user does with the
            user-generated content.
          </p>
          <h2 className="text-2xl font-bold">8. General Terms and Law</h2>
          <p>
            This Agreement is governed by the laws of Canada. You acknowledge
            that no joint venture, partnership, employment, or agency
            relationship exists between you and FitiTrack as a result of your
            use of these services. You agree not to hold yourself out as a
            representative, agent or employee of FitiTrack. You agree that
            FitiTrack will not be liable by reason of any representation, act or
            omission to act by you.
          </p>
          <p>Last updated: August 23, 2024.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
