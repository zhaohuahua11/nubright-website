import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import styles from './DataProtectionPolicyPage.module.css'

const TOC = [
  'Introduction',
  'Definitions and Interpretation',
  'Representations and Warranties',
  'Scope of Services',
  "Client's Obligations",
  'Fees and Payment Terms',
  'Term and Termination',
  'Complaints',
  'Limitation of Liability and Indemnification',
  'Confidentiality and Data Protection',
  'General Provisions',
]

export default function TermsAndConditionsPage({ onContactClick }) {
  return (
    <>
      <Navbar onContactClick={onContactClick} />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <h1 className={styles.title}>Terms and Conditions</h1>
            <p className={styles.meta}>NuBright Fund Services Limited · Ref. 250401</p>
            <nav className={styles.toc}>
              {TOC.map((title, i) => (
                <a key={i} href={`#section-${i + 1}`} className={styles.tocItem}>
                  <span className={styles.tocNum}>{i + 1}.</span>
                  <span>{title}</span>
                </a>
              ))}
            </nav>
          </header>

          <div className={styles.body}>

            {/* Section 1 */}
            <section id="section-1" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>1.</span> Introduction</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}></span>
                <p>These terms and conditions (the "Terms") shall govern all services provided by NuBright Fund Services Limited ("NFSL", "we", "us" or "our"). By engaging our services, the Client ("you" or "your") agree to be bound by these Terms, subject to any rights under applicable law. These Terms shall be incorporated into and read in conjunction with the rest part of the Agreement (as defined below) relating to the subject matter herein. All prior representations, agreements (whether oral or written), negotiations and understandings are hereby expressly superseded. In the event of inconsistency, the other provisions of the Agreement shall prevail over these Terms solely for the purpose of resolving that specific inconsistency.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section-2" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>2.</span> Definitions and Interpretation</h2>

              <div className={styles.clause}>
                <span className={styles.clauseNum}>2.1</span>
                <div>
                  <p><strong>Definitions</strong></p>
                  <p>In these Terms, the following terms shall have the meanings ascribed below:</p>
                  <p><strong>"Agreement"</strong> means the administration agreement between NFSL and the Client (including all of its schedules, annexes and attachments and these Terms), as amended in accordance with its terms from time to time.</p>
                  <p><strong>"Affiliate"</strong> means, with respect to any entity, any other entity that directly or indirectly Controls, is Controlled by, or is under common Control with such entity. For purposes hereof, "Control" shall mean ownership of 50% or more of voting securities or equity interests, or the power to direct management policies through contractual arrangements or otherwise.</p>
                  <p><strong>"Authorised Representatives"</strong> means, in respect of Client, the Client's Operator and the individuals:</p>
                  <ol className={styles.alphaList}>
                    <li>designated by the Client's Operator as its authorised representative in a written resolution; and</li>
                    <li>listed in the Register of Authorised Representatives (as updated from time to time),</li>
                  </ol>
                  <p>provided that NFSL has received a certified copy of the approving resolution and may rely conclusively on the Register until receiving proper written revocation of such designation.</p>
                  <p><strong>"Client"</strong> means the party engaging NFSL's services as specified in the Administration Agreement.</p>
                  <p><strong>"Constitutional Documents"</strong> means, in respect of a legal entity or arrangement: (a) the following documents: (i) if a company, its memorandum and articles of association; (ii) if a partnership, its partnership agreement; (iii) if a trust, its trust deed or declaration of trust; and including, if an investment fund, its then-current offering document and form of subscription agreement; in each case including any amendments, restatements, or successor documents.</p>
                  <p><strong>"Effective Date"</strong> means the date on which the Agreement takes effect.</p>
                  <p><strong>"Force Majeure"</strong> means an event or circumstance that: (a) is beyond the reasonable control of the affected party; (b) could not have been avoided by reasonable efforts or prudent industry practices; and (c) materially prevents or delays the performance of obligations under the Agreement. Such events may include natural disasters, acts of war or terrorism, pandemics, governmental actions, systemic infrastructure failures, or other events of a similar nature.</p>
                  <p><strong>"Gross Negligence"</strong> means: (a) a conscious or reckless disregard of a material and foreseeable risk or a legal, fiduciary, or contractual duty owed to the Client, provided that such conduct substantially exceeds ordinary negligence; or (b) a gross deviation from the standard of care expected of a fund administrator in Hong Kong in similar circumstances.</p>
                  <p><strong>"Indemnified Persons"</strong> means NFSL, its Affiliates, and their respective directors, officers, employees, shareholders, agents, delegates, professional advisers, and authorized third-party vendors.</p>
                  <p><strong>"Losses"</strong> means all monetary obligations (including contractual liabilities, damages, regulatory fines, tax liabilities), costs and expenses (including reasonable legal fees, investigation costs, and dispute resolution expenses), and any other quantifiable pecuniary losses, arising under contract, tort, statute, or equitable claims, whether direct, indirect, actual, contingent, or prospective. Losses shall not include indirect or speculative losses such as unrealized lost profits, business opportunities, goodwill, or reputational harm (unless awarded as direct damages by final judgment), nor amounts recoverable under insurance.</p>
                  <p><strong>"NFSL"</strong> means NuBright Fund Services Limited, its successors in interest and permitted assigns.</p>
                  <p><strong>"Operator"</strong> means, in respect of a legal entity or arrangement: (a) if a company, its directors; (b) if a partnership, its general partner(s); (c) if a trust, its trustee(s) or appointed manager(s).</p>
                  <p><strong>"Proper Instruction"</strong> means any instruction, direction, or request: (a) purported to be issued by an Authorised Representative; (b) notified to us in writing; and (c) in respect of which we have no actual knowledge of its being unauthorized or fraudulent.</p>
                  <p><strong>"Regulated Activity"</strong> means any activity requiring licensing, registration or authorization under the laws of the jurisdiction where the Client or NFSL is established or operates, or any other applicable regulatory regime having jurisdiction over the relevant activity.</p>
                </div>
              </div>

              <div className={styles.clause}>
                <span className={styles.clauseNum}>2.2</span>
                <div>
                  <p><strong>Interpretation</strong></p>
                  <p>In this Agreement, unless the context otherwise requires: any reference to a Clause, Section, or Schedule refers to the relevant provision of these Terms; references to any document include such document as amended, supplemented, substituted, or novated from time to time; references to Hong Kong statutes include all amendments, re-enactments, or successor provisions; the singular includes the plural (and vice versa); headings are for convenience only; references to persons include natural persons, corporations, and legal entities; references to "writing" include electronic communications if legally enforceable; references to "days" mean calendar days unless specified as business days; and no party shall be deemed to have committed Gross Negligence, willful misconduct, or fraud unless finally adjudicated as such by a non-appealable court judgment.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-3" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>3.</span> Representations and Warranties</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>3.1</span>
                <div>
                  <p>Each party hereby represents and warrants to the other party that, as of the Effective Date and until termination of the Agreement, the following statements are true, accurate and not misleading:</p>
                  <ol className={styles.alphaList}>
                    <li>It is duly organized, validly existing and in good standing under the laws of its jurisdiction of incorporation, and has full power, authority and legal right to (i) execute, deliver and perform its obligations under the Agreement, and (ii) consummate all transactions contemplated hereby;</li>
                    <li>The execution, delivery and performance of the Agreement (i) have been duly authorised by all necessary corporate action, (ii) do not and will not violate any provision of its Constitutional Documents or any resolution of its governing body, (iii) will not conflict with or result in any breach of any applicable laws or regulations, or (iv) constitute a default under any material agreement, judgment or order to which it is a party or by which it is bound; and</li>
                    <li>It is and has remained in full compliance with all applicable laws, regulations, licensing requirements and governmental approvals necessary for the performance of its obligations hereunder.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>3.2</span>
                <p>If any representation or warranty under the Agreement becomes untrue, inaccurate or misleading, the party making such representation or warranty shall immediately notify the other party in writing.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>4.</span> Scope of Services</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.1</span>
                <div>
                  <p><strong>Services Provided</strong></p>
                  <p>NFSL shall provide the following services:</p>
                  <ol className={styles.alphaList}>
                    <li>The services that NFSL is obliged to provide are limited to those as specified in the Agreement.</li>
                    <li>Any modifications to the scope of services as proposed by NFSL may only be made by: (i) a duly executed written amendment to the Agreement; (ii) written confirmation (including email) by the Client's Authorised Representative.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.2</span>
                <div>
                  <p><strong>Exclusions</strong></p>
                  <p>NFSL's role is strictly administrative. Unless expressly agreed in writing, the following are excluded from NFSL's services or responsibilities:</p>
                  <ol className={styles.alphaList}>
                    <li><strong>Regulated Activities:</strong> NFSL does not (i) conduct investment management, advisory, or discretionary services; (ii) engage in fund distribution, marketing, or licensed intermediation; or (iii) monitor compliance or assume responsibility for the Client's regulatory compliance.</li>
                    <li><strong>Legal, Regulatory, and Tax Matters:</strong> NFSL does not (i) provide legal opinions, regulatory compliance certifications, or binding assessments regarding the Client's structure or Constitutional Documents; or (ii) advise on tax issues for the Client or its investors in any jurisdiction. NFSL may administratively support the preparation of tax filings (e.g., FATCA/CRS) based on Client or investor provided data, but does not act as a tax advisor, "sponsor," or "responsible officer" unless separately agreed.</li>
                    <li><strong>Financial Data Verification:</strong> NFSL is not responsible for (i) auditing or verifying any unaudited financial records; or (ii) providing assurances on the accuracy, completeness, or fairness of processed financial data.</li>
                    <li><strong>Fiduciary and Custodial Roles:</strong> NFSL does not act in a fiduciary or custodial capacity, nor does it assume any responsibility for the protection of client assets. Where NFSL has payment authority, its sole obligation is to verify that instructions align with supporting documentation.</li>
                    <li><strong>Fraud or Misconduct:</strong> NFSL has no duty to detect, investigate, disclose, or take action in response to errors, fraud, or unlawful conduct.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.3</span>
                <div>
                  <p><strong>Anti-Money Laundering and Counter-Terrorist Financing</strong></p>
                  <p>NFSL is required to operate know-your-client procedures in accordance with applicable AML/CFT legislation in Hong Kong (the "Administrator AML Regime"). Before accepting appointment, and on a periodic basis thereafter, NFSL will satisfy its obligations as to identifying and/or verifying the identity of the Client, any person acting on behalf of the Client and the ultimate beneficial owner(s) of the Client.</p>
                  <p>When the Client is an investment fund and appoints NFSL to provide comprehensive registrar and transfer agent services, the following provisions apply:</p>
                  <ol className={styles.alphaList}>
                    <li>The Client acknowledges that it is subject to the relevant AML/CFT legislations of the place where it is incorporated and/or operated (the "Fund AML Regime").</li>
                    <li>Where the Client is incorporated in a place other than Hong Kong, NFSL will: (i) undertake a gap analysis between the Fund AML Regime and the Administrator AML Regime and take appropriate measures; or (ii) apply and comply with the Fund AML Regime.</li>
                    <li>NFSL shall maintain on behalf of the Client anti-money laundering procedures (the "Procedures") in relation to: (i) identification and verification of investors, including sanctions screening; (ii) maintaining and monitoring records relating to investor identity; (iii) maintaining adequate systems to identify risk; (iv) maintaining risk-management procedures; (v) observance of FATF non-compliant country lists; (vi) establishing appropriate internal controls and reporting procedures; and (vii) internal controls and communication for the ongoing monitoring of investors.</li>
                    <li>In maintaining the Procedures, NFSL shall: (i) provide written evidence of its suitability to perform the Procedures upon request; and (ii) provide client information to the Client or the Fund AML Authority upon lawful request.</li>
                    <li>NFSL acknowledges that the Client is relying upon its delegation of the maintenance of the Procedures to enable the Client to be compliant with the Fund AML Regime.</li>
                    <li>The Client and NFSL agree that, notwithstanding the Client's delegation to NFSL the maintenance of the Procedures, the Client shall be ultimately responsible for compliance with the Fund AML Regime.</li>
                    <li>NFSL's business relationship is with the Client but not with the Client's investors for purposes of AML/CFT compliance.</li>
                    <li>NFSL shall keep the Client and its AML Officers regularly informed of any AML/CFT related matters.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.4</span>
                <div>
                  <p><strong>Performance Standards</strong></p>
                  <ol className={styles.alphaList}>
                    <li><strong>Compliance with Instructions:</strong> NFSL shall provide services in accordance with the Client's Proper Instructions. NFSL reserves the right to refuse any instruction that it reasonably believes would violate applicable laws. Where legally permitted, NFSL shall provide the Client written notice of such refusal within ten (10) days.</li>
                    <li><strong>Audit &amp; Reviews:</strong> NFSL shall submit to periodic operational and financial reviews by the Client or its appointed independent auditors at mutually agreed intervals, upon not less than thirty (30) days' prior written notice.</li>
                    <li><strong>Regulatory Examinations:</strong> The Client agrees that NFSL may be required by regulatory authorities to assist regulatory examinations or investigations and hereby authorises NFSL to fully cooperate with such examinations or investigations, including providing relevant data relating to the Client or its investors.</li>
                    <li><strong>Suspension of Services:</strong> NFSL reserves the right, in its absolute discretion, acting reasonably and in good faith, to withhold or suspend any services not directly tied to a Proper Instruction if it reasonably believes such services would contravene any law, regulatory requirement, or professional conduct rules.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.5</span>
                <div>
                  <p><strong>Sub-Delegation</strong></p>
                  <p>NFSL may sub-delegate all or any part of its powers, duties and obligations under the Agreement to any of its Affiliates or reputable third parties (each a "Sub-Administrator"), provided that:</p>
                  <ol className={styles.alphaList}>
                    <li>no such sub-delegation shall relieve NFSL of its primary liability to Client for the proper performance of the delegated duties; and</li>
                    <li>unless otherwise expressly agreed in writing by Client, all fees and expenses payable to any Sub-Administrator shall be solely for the account of NFSL.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section-5" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>5.</span> Client's Obligations</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.1</span>
                <div>
                  <p><strong>Proper Instructions and Timely Cooperation</strong></p>
                  <p>NFSL shall not be required to perform any of the following services unless it receives the relevant Proper Instructions:</p>
                  <ol className={styles.alphaList}>
                    <li>initiating and/or approving wire transfers of money for or on behalf of the Client;</li>
                    <li>processing all investor transactions (including subscriptions, redemptions, capital commitments, capital calls, transfers of interest), including issue of relevant contract notes;</li>
                    <li>issuing, distributing or otherwise making available the net asset value reports/statements, register of investors, financial statements, meeting notices, investor reports, or other written investor communication materials;</li>
                    <li>preparing and submitting annual reports in the prescribed formats to the relevant tax authorities.</li>
                  </ol>
                  <p>Conflicting instructions from the Client's Authorised Representatives are not Proper Instructions. The Client shall ensure that: (a) all Proper Instructions shall be issued exclusively by Authorised Representatives, clear, unambiguous and provided with sufficient lead time; (b) conflicting Proper Instructions between Authorised Representatives are referred to the Operator for final determination; (c) its Authorised Representatives respond promptly and completely to all NFSL inquiries.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.2</span>
                <div>
                  <p><strong>Removal of Authorised Representatives</strong></p>
                  <p>The Client may revoke authority of an Authorised Representative who is not an Operator by providing NFSL with a written revocation notice and certified copy of the Operator's approving resolution, with such revocation becoming effective immediately upon NFSL's receipt of complete documentation.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.3</span>
                <div>
                  <p><strong>Information Provision</strong></p>
                  <p>The Client shall ensure NFSL receives all necessary information and documentation in an accurate, complete and timely manner, and shall procure that such information and documentation:</p>
                  <ol className={styles.alphaList}>
                    <li>are in a format and structure compliant with NFSL's then-current operational requirements;</li>
                    <li>are accompanied by proper and verifiable supporting documentation, including trade confirmations, counterparty agreements, and valuation reports; and</li>
                    <li>are provided with sufficient lead time to enable NFSL to perform its obligations under the Agreement.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.4</span>
                <div>
                  <p><strong>Pricing and Valuation Support</strong></p>
                  <p>Where valuation of unlisted securities or hard-to-value investments is required, the Client shall provide NFSL with pricing and valuation methodologies in respect of such assets, which must be reasonable and in line with IFRS, GAAP, or other industry-accepted accounting standards. The Client shall remain solely responsible for compliance with applicable valuation standards and shall promptly notify NFSL of any material changes to such methodologies.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.5</span>
                <div>
                  <p><strong>Document Amendments</strong></p>
                  <p>The Client acknowledges that the Client's Constitutional Documents are highly relevant to proper performance of duties by NFSL. If the Client proposes to amend its Constitutional Documents, the Client shall submit to NFSL draft amendments promptly (and in any event within ten (10) days from such amendment taking effect). No amendment that affects NFSL's duties, rights, or liabilities shall be effective without NFSL's prior written consent.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.6</span>
                <div>
                  <p><strong>Notification of Changes</strong></p>
                  <p>Client shall promptly (and in any event within ten (10) days from the relevant change taking effect) notify NFSL in writing of any changes to:</p>
                  <ol className={styles.alphaList}>
                    <li>its legal or regulatory status (including changes in its licensing, registration, or tax classification);</li>
                    <li>its ownership, control, or management structure (including changes to directors, officers, shareholders, or beneficial owners);</li>
                    <li>its material service providers (including banks, brokers, custodians, investment managers, auditors, or legal counsel); and</li>
                    <li>its registered office or principal place of business.</li>
                  </ol>
                  <p>Failure to notify material changes under this Clause 5.6 shall relieve NFSL from any liability of improper performance of duties in relation to such unnotified change.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.7</span>
                <div>
                  <p><strong>Notification of ML/TF and Regulatory Issues</strong></p>
                  <p>Client shall promptly (and in any event within five (5) days or a shorter period expressly specified below from becoming aware of relevant event) notify NFSL in writing upon becoming aware of any actual or suspected events, including but not limited to:</p>
                  <ol className={styles.alphaList}>
                    <li>any material changes to an investor's profile that would trigger enhanced due diligence;</li>
                    <li>any investor being identified as high-risk under the fund's AML/CFT policies;</li>
                    <li>within twenty four (24) hours, any suspected fraud or AML breaches or regulatory breach of any jurisdiction; or</li>
                    <li>the Client or its Operators being subject to any regulatory examination or investigation.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.8</span>
                <div>
                  <p><strong>Use of NFSL's Name</strong></p>
                  <p>The Client shall not use NFSL's name, logo, or trademarks in any offering documents, marketing materials, or other fund-related communications without NFSL's prior written consent. Any unauthorized use shall entitle NFSL to require immediate cessation and/or seek injunctive relief.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section-6" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>6.</span> Fees and Payment Terms</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.1</span>
                <div>
                  <p><strong>Fee Structure</strong></p>
                  <p>The Client shall pay NFSL the fees as set forth in the Agreement or such other amounts as may be mutually agreed in writing by the parties from time to time. All fees are exclusive of any applicable taxes, levies, or duties.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.2</span>
                <div>
                  <p><strong>Invoicing and Payment</strong></p>
                  <p>Unless otherwise specified in the Agreement, NFSL will issue invoices to the Client for services rendered on a monthly basis. All invoices shall be payable in full within thirty (30) days of the invoice date. Late payments shall bear interest at the rate of one and one-half percent (1.5%) per month, or the maximum rate permitted by applicable law, whichever is lower, calculated from the due date until the date of actual payment.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.3</span>
                <div>
                  <p><strong>No Set-off</strong></p>
                  <p>All amounts due to NFSL shall be paid in full without set-off, counterclaim, deduction or withholding, save as required by law.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.4</span>
                <div>
                  <p><strong>Currency and Exchange</strong></p>
                  <p>All invoices shall be issued in United States Dollars (USD). Where payment is made in Hong Kong Dollars (HKD), the exchange rate shall be the higher of:</p>
                  <ol className={styles.alphaList}>
                    <li>HKD 7.85 per USD; or</li>
                    <li>The prevailing exchange rate quoted by NFSL's designated bank at the time of payment. All bank fees and charges in connection with currency conversion and remittance shall be borne by the Client.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.5</span>
                <div>
                  <p><strong>Disputed Charges</strong></p>
                  <p>Any dispute regarding charges must be notified in writing within ten (10) days of receipt of invoice. Undisputed amounts remain payable in accordance with this Clause. Notwithstanding the foregoing, NFSL may, acting reasonably and in good faith, consider out-of-time disputes.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="section-7" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>7.</span> Term and Termination</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>7.1</span>
                <div>
                  <p><strong>Termination for Cause</strong></p>
                  <p>Either party may terminate the Agreement immediately upon written notice if any of the following events occurs:</p>
                  <ol className={styles.alphaList}>
                    <li>If the Client is a fund and such fund has not commenced operations within twenty-four (24) months of the Effective Date, or where the parties mutually agree in writing that the anticipated commencement of operations has become uncertain;</li>
                    <li>The other party materially breaches the Agreement and fails to remedy such breach within thirty (30) days of written notice;</li>
                    <li>The other party becomes insolvent, enters into liquidation or administration, or ceases to carry on business;</li>
                    <li>Continued performance of services would, in NFSL's reasonable opinion, cause material reputational harm, acting in good faith;</li>
                    <li>The other party is subject to regulatory examination, investigation or enforcement action;</li>
                    <li>Termination is required by applicable law or regulation.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>7.2</span>
                <div>
                  <p><strong>Post-Termination Data Handling</strong></p>
                  <ol className={styles.alphaList}>
                    <li>Within ninety (90) days of termination, NFSL shall transfer all business data and documents ("Client Materials") to the Client in mutually agreed electronic formats; and destroy original physical documents unless otherwise requested by the Client.</li>
                    <li>NFSL shall retain electronic copies of Client Materials for two (2) years from the Termination Date ("Retention Period"), after which such copies may be securely destroyed.</li>
                    <li>The Client assumes all risks of loss, damage, corruption or format obsolescence of retained electronic copies during the Retention Period. NFSL may charge its then-current standard fees for data retrieval, conversion or delivery during the Retention Period.</li>
                    <li>NFSL shall have a first-priority lien over all Client Materials, entitling it to withhold data transfers until all outstanding fees, expenses and indemnifiable amounts are paid in full.</li>
                    <li>NFSL may retain Client Materials beyond the Retention Period where required by applicable laws, regulations or pending legal/regulatory proceedings.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="section-8" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>8.</span> Complaints</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}></span>
                <p>If the Client at any time has any queries or concerns on any aspect of NFSL's services, the Client may contact the operations manager. If this does not satisfactorily resolve the matter, or alternatively, if preferred, the Client may contact the managing director.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="section-9" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>9.</span> Limitation of Liability and Indemnification</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>9.1</span>
                <div>
                  <p><strong>Standard of Care</strong></p>
                  <p>NFSL shall perform its obligations under the Agreement with the degree of skill, care, diligence, and professionalism reasonably expected of a fund administrator in Hong Kong providing comparable services under the Proper Instructions. Notwithstanding the foregoing: (a) NFSL does not guarantee the services will be error-free or fit for any particular purpose beyond compliance with generally accepted Hong Kong fund administration standards; and (b) NFSL makes no representations as to the accuracy of any third-party data or tools used in service delivery.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>9.2</span>
                <div>
                  <p><strong>Liability Scope</strong></p>
                  <ol className={styles.alphaList}>
                    <li>NFSL's liability under this Agreement shall be limited to Losses that are directly and proximately caused by its own Gross Negligence, willful misconduct, or fraud in the performance of its obligations hereunder;</li>
                    <li>NFSL shall in no event be liable for any matter expressly excluded under the definition of "Losses" or for any Losses arising from circumstances beyond its reasonable control; and to the fullest extent permitted by applicable law, nothing in this Agreement shall operate to exclude or limit liability for any matter which cannot be lawfully excluded or limited under the laws of Hong Kong;</li>
                    <li>NFSL shall not be liable for any of the following: (i) Industry-Customary Risks: NAV calculation variances falling within 0.5% tolerance threshold; valuation discrepancies arising from Client-approved methodologies; any bona fide operational variances consistent with generally accepted industry norms in Hong Kong; (ii) Regulatory Compliance Risks: the Client's or its Operator's compliance status with any applicable regulatory regime; NFSL's reliance on any representations or warranties provided by the Client regarding its regulatory status; (iii) Third-Party Risks: reliance on data or instructions provided by the Client or any third party; acts, omissions, errors, or delays of custodians, brokers, data vendors, or other third-party service providers; liability for the accuracy of data provided by any predecessor administrator; (iv) Market-Related Risks: any market volatility, currency fluctuations, or interest rate changes; any Force Majeure Events; (v) Risks Arising from AML/CFT Obligations: mandatory disclosures to authorities regarding suspicious activities; any suspension or termination of services due to lack of Proper Instructions or incomplete verification; (vi) Personnel Matters: withdrawal or replacement of seconded personnel at NFSL's sole discretion; (vii) Electronic Communications Risks: losses arising from the use of electronic communications, unauthorized interception, corruption, or delay of electronic transmissions, virus transmission, or breaches of information security systems not directly controlled by NFSL; (viii) Investor Losses: any consequential, indirect, or special loss or damage; any economic losses (including loss of revenues, profits, contracts, business, or anticipated savings);</li>
                    <li>Nothing in the Agreement shall operate to exclude or limit liability for any matter expressly prohibited by the mandatory provisions of applicable law.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>9.3</span>
                <div>
                  <p><strong>Liability Cap</strong></p>
                  <p>NFSL's aggregate liability to the Client for any loss or damage arising out of or in connection with its services shall be limited to the greater of:</p>
                  <ol className={styles.alphaList}>
                    <li>The total fees paid by the Client to NFSL under the Agreement in the 12 months preceding the event giving rise to the claim; or</li>
                    <li>The amounts recoverable under NFSL's professional indemnity insurance.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>9.4</span>
                <div>
                  <p><strong>Claims Period</strong></p>
                  <p>Except in the case of fraud, any claim under the Agreement must be commenced within twelve (12) months from the date the claiming party became aware, or ought reasonably to have become aware, of the facts giving rise to the claim, and in any event within twenty-four (24) months from the occurrence of the event giving rise to the claim.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>9.5</span>
                <div>
                  <p><strong>Client Indemnity</strong></p>
                  <p>The Client shall indemnify, defend, and hold harmless each of the Indemnified Persons from and against all claims, losses, damages, costs (including reasonable legal fees), and liabilities arising out of or related to:</p>
                  <ol className={styles.alphaList}>
                    <li>The Client's breach of the Agreement (including failure to provide accurate, complete, and timely data or valid Proper Instructions);</li>
                    <li>The Client's violation of applicable laws, rules, or regulations;</li>
                    <li>Any material misrepresentation or omission in the fund's Constitutional Documents, investor communications, or regulatory filings;</li>
                    <li>Unauthorized use of NFSL's name, logo, or intellectual property;</li>
                    <li>Third-party claims (by investors, regulators, or other parties) relating to the fund's investments, operations, reporting or NFSL's provision of services, except to the extent such Losses are directly caused by the relevant Indemnified Person's Gross Negligence, willful misconduct, or fraud as determined by a final non-appealable judgment.</li>
                  </ol>
                  <p>NFSL shall notify the Client in writing of any claim potentially giving rise to indemnification.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>9.6</span>
                <div>
                  <p><strong>Mitigation &amp; Duty to Notify</strong></p>
                  <ol className={styles.alphaList}>
                    <li>NFSL shall use commercially reasonable efforts to mitigate Losses upon becoming aware of any claim or circumstance that may give rise to indemnification hereunder;</li>
                    <li>The Client must notify NFSL in writing of any other claims or potential breaches of this Agreement within ten (10) days from becoming aware.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="section-10" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>10.</span> Confidentiality and Data Protection</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>10.1</span>
                <div>
                  <p><strong>Definition of Confidential Information</strong></p>
                  <ol className={styles.alphaList}>
                    <li>"Confidential Information" means all non-public information (whether commercial, technical, operational, or financial) disclosed by or on behalf of a party (the "Disclosing Party") to the other party (the "Recipient"), including but not limited to: (i) fund structure, investors, or investment strategies; (ii) any Personal Data as defined in the Hong Kong Personal Data (Privacy) Ordinance or sensitive information relating to investors, beneficiaries, or other natural persons; and (iii) any information expressly classified by the Disclosing Party as confidential.</li>
                    <li>Information shall not be deemed confidential if it: (i) is lawfully obtained from a third party without breach of contractual confidentiality restrictions; (ii) is independently developed by the Recipient (with documented proof); or (iii) becomes publicly available without breach of the Agreement.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>10.2</span>
                <div>
                  <p><strong>Obligations of the Recipient</strong></p>
                  <p>The Recipient shall:</p>
                  <ol className={styles.alphaList}>
                    <li>Use Confidential Information solely for the purposes of performing its obligations under the Agreement and meeting requirements imposed by applicable laws or regulatory authorities;</li>
                    <li>Maintain Confidential Information in strict confidence, applying security measures no less stringent than those used for its own confidential information;</li>
                    <li>Confidential Information may be disclosed only to: (i) Recipient's employees, officers, or professional advisors on a need-to-know basis, provided that they shall be subject to confidentiality obligations of similar level; (ii) third-party service providers under binding confidentiality agreements; and (iii) regulatory authorities if legally required, provided the Recipient gives prior written notice to the Disclosing Party (unless prohibited by law) and limits disclosure to the extent necessary.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>10.3</span>
                <div>
                  <p><strong>Data Protection Compliance</strong></p>
                  <ol className={styles.alphaList}>
                    <li>All processing of Personal Data shall be governed by the parties' data protection policy and conducted in accordance with applicable data protection laws of the jurisdiction where the relevant party is domiciled or operates, including Hong Kong PDPO.</li>
                    <li>By entering into this Agreement, the Client acknowledges that it has read and understands NFSL's Data Protection Policy, which is given to the Client or made available on NFSL's website.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>10.4</span>
                <div>
                  <p><strong>Breach Notification &amp; Mitigation</strong></p>
                  <ol className={styles.alphaList}>
                    <li>In the event of any actual or suspected unauthorized access, disclosure, or loss of Confidential Information (including Personal Data), the Recipient shall: (i) promptly notify the Disclosing Party; and (ii) take commercially reasonable steps to mitigate harm and prevent further breaches.</li>
                    <li>Specific procedures for investigation, remediation, and regulatory reporting shall be conducted pursuant to applicable laws.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 11 */}
            <section id="section-11" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>11.</span> General Provisions</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.1</span>
                <div>
                  <p><strong>Sanctions</strong></p>
                  <p>Each party represents that it is not listed on, or owned or controlled by any person listed on, any applicable sanctions list, or located, organized, or resident in a comprehensively sanctioned jurisdiction. Each party shall comply with applicable financial sanctions and export control laws in connection with performance of the Agreement, and NFSL may suspend performance where it reasonably believes such performance would cause a violation thereof.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.2</span>
                <div>
                  <p><strong>Amendment</strong></p>
                  <ol className={styles.alphaList}>
                    <li>NFSL may amend these Terms by providing at least thirty (30) days' prior written notice, delivered through simultaneous posting of the revised Terms on NFSL's official website and email notification to your designated contact address. The amendments shall automatically take effect upon expiration of the notice period unless you submit a written objection letter prior to the effective date.</li>
                    <li>Notwithstanding Clause 11.2(a), any amendments to: (i) the Scope of Services; (ii) the Fees and Payment Terms; or (iii) any material obligations under the Agreement, shall require the prior written mutual agreement of the parties.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.3</span>
                <div>
                  <p><strong>Assignment</strong></p>
                  <p>If we merge with or transfer our business to a successor firm (the "Successor Firm"), the Agreement shall not automatically terminate. NFSL will notify the Client in advance of the proposed merge or business transfer. The Client may terminate the Agreement by giving an objection letter within thirty (30) days from prior notification if the Client reasonably believes that the continued engagement of the Successor Firm involves material credit or operational risks.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.4</span>
                <div>
                  <p><strong>No Partnership or Agency</strong></p>
                  <p>Nothing in the Agreement shall create a partnership, joint venture, or agency relationship between the parties. Each party is an independent contractor.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.5</span>
                <div>
                  <p><strong>Third-party Rights Exclusion</strong></p>
                  <p>No person who is not a party to the Agreement shall have any third party rights under the Contracts (Rights of Third Parties) Ordinance (Cap. 623) to enforce any term of the Agreement, except for the Indemnified Persons.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.6</span>
                <div>
                  <p><strong>Counterparts</strong></p>
                  <p>The Agreement may be executed in any number of counterparts (including by electronic signature or PDF transmission), each of which shall be deemed an original, but all of which together shall constitute one and the same instrument. Electronic signatures shall comply with the Hong Kong Electronic Transactions Ordinance (Cap. 553) or other applicable laws.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.7</span>
                <div>
                  <p><strong>Notice</strong></p>
                  <p>All notices, consents, or approvals required under the Agreement shall be in writing and delivered:</p>
                  <ol className={styles.alphaList}>
                    <li>by hand (deemed received upon delivery);</li>
                    <li>by registered post or courier (return receipt requested); or</li>
                    <li>by email.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.8</span>
                <div>
                  <p><strong>Non-Solicitation</strong></p>
                  <p>During the term and for twelve (12) months thereafter, neither party shall, without the other party's prior written consent, solicit for employment any employee of the other party who was directly and materially involved in the provision or receipt of NFSL's services hereunder.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.9</span>
                <div>
                  <p><strong>Severability</strong></p>
                  <p>If any provision is held invalid, the remainder shall continue in full force. The invalid provision shall be replaced by a valid one reflecting the original intent.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.10</span>
                <div>
                  <p><strong>Waiver</strong></p>
                  <p>No failure or delay in exercising any right shall operate as a waiver unless expressly agreed in writing.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.11</span>
                <div>
                  <p><strong>Survival Clauses</strong></p>
                  <p>The following Clauses shall survive termination: Clauses 6, 7.2, 10, 11.5, and 11.12.</p>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>11.12</span>
                <div>
                  <p><strong>Language</strong></p>
                  <p>The Agreement is executed in English. Any translations are for convenience only, and the English version shall prevail in case of conflict.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
