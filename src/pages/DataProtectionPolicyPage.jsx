import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import styles from './DataProtectionPolicyPage.module.css'

export default function DataProtectionPolicyPage({ onContactClick }) {
  return (
    <>
      <Navbar onContactClick={onContactClick} />

      <main className={styles.main}>
        <div className={styles.container}>

          <header className={styles.header}>
            <h1 className={styles.title}>Data Protection Policy</h1>
            <p className={styles.meta}>NuBright Fund Services Limited · Ref. 190204</p>
            <nav className={styles.toc}>
              {[
                'Definitions',
                'Types of Personal Data Collected from The Client',
                'Purpose and Manner of Collection of Personal Data',
                'Accuracy and Duration of Retention of Personal Data',
                'Use of Personal Data',
                'Security of Personal Data',
                'Information to Be Generally Available',
                'Access to Personal Data',
              ].map((title, i) => (
                <a key={i} href={`#section-${i + 1}`} className={styles.tocItem}>
                  <span className={styles.tocNum}>{i + 1}.</span>
                  <span>{title}</span>
                </a>
              ))}
            </nav>
          </header>

          <div className={styles.intro}>
            <p>NuBright Fund Services Limited ("NFSL") and its staff shall comply with the <em>Personal Data (Privacy) Ordinance</em>, which exists to protect the privacy of individuals on personal data collected from them.</p>
          </div>

          <div className={styles.body}>

            <section id="section-1" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>1.</span> Definitions</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>1.1</span>
                <div>
                  <p>"<strong>Personal Data</strong>" means any data:</p>
                  <ol className={styles.alphaList}>
                    <li>relating directly or indirectly to a living individual;</li>
                    <li>from which it is possible for the identity of the individual to be directly or indirectly ascertained; and</li>
                    <li>which is in a form in which access to or processing of the data is practicable.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>1.2</span>
                <p>"<strong>Data Subject</strong>" means the individual person who is the subject of the data.</p>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>1.3</span>
                <p>"<strong>Data User</strong>" means the person who controls the collection, holding, processing or use of the data (i.e., NFSL).</p>
              </div>
            </section>

            <section id="section-2" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>2.</span> Types of Personal Data Collected from The Client</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>2.1</span>
                <div>
                  <p>NFSL may hold the following types of information from the clients, any person acting on behalf of the client and the ultimate beneficial owner(s) of the client:</p>
                  <ol className={styles.alphaList}>
                    <li>residence addresses, email addresses and telephone numbers;</li>
                    <li>copies of identity cards;</li>
                    <li>copies of passports and visa details;</li>
                    <li>copies of exit-entry permit;</li>
                    <li>copies of driving licence;</li>
                    <li>dates of birth, country/region of birth, nationality and sex;</li>
                    <li>details of spouse, children or other beneficiaries;</li>
                    <li>copies of education certificates and reports;</li>
                    <li>employment references and history;</li>
                    <li>details of other regulatory registrations and disciplinary or court actions;</li>
                    <li>personal references;</li>
                    <li>source of wealth and fund;</li>
                    <li>bank account details;</li>
                    <li>signatures;</li>
                    <li>salary and benefits details, including bonus payments, options holdings, retirement benefits, rental details, travel details, car expenses, school expenses, bank account numbers, taxation records and the like; and</li>
                    <li>such other information as required by the applicable laws for NFSL to fulfil its duties and obligations.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section id="section-3" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>3.</span> Purpose and Manner of Collection of Personal Data</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>3.1</span>
                <p>NFSL shall not collect Personal Data unless the data is collected for a lawful and necessary purpose directly related to the activities of NFSL and the data collected is adequate but not excessive in relation to the purpose for which it is collected.</p>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>3.2</span>
                <div>
                  <p>NFSL should collect Personal Data using lawful and fair means. When NFSL collects Personal Data from a Data Subject it should ensure that:</p>
                  <ol className={styles.alphaList}>
                    <li>the Data Subject is informed before collection of the data whether it is obligatory or voluntary for him to provide the data and the consequences of failure to provide the data;</li>
                    <li>the Data Subject is explicitly informed of the purposes for which the data will be used and to whom the data may be transferred; and</li>
                    <li>before the first use of the data the Data Subject knows of his right to request access or correction to the data and the contact person at NFSL to whom such a request would be made.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section id="section-4" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>4.</span> Accuracy and Duration of Retention of Personal Data</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.1</span>
                <div>
                  <p>NFSL shall ensure that:</p>
                  <ol className={styles.alphaList}>
                    <li>personal Data is accurate for the purpose for which it is to be used;</li>
                    <li>where NFSL reasonably believes the data to be inaccurate, it should not use the data until the inaccuracies are rectified; and</li>
                    <li>where NFSL has provided inaccurate data to third parties, NFSL should inform the third party about the data's inaccuracy and attempt to provide the third party with the accurate data.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>4.2</span>
                <p>NFSL shall not keep Personal Data any longer than is necessary for the fulfilment of the purpose (including any directly related purpose) for which the data was obtained.</p>
              </div>
            </section>

            <section id="section-5" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>5.</span> Use of Personal Data</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>5.1</span>
                <p>NFSL shall not use Personal Data for any purpose other than the purpose the data was collected for or any related purpose or any other purpose that has been specifically disclosed to and consented to by the data subject.</p>
              </div>
            </section>

            <section id="section-6" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>6.</span> Security of Personal Data</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.1</span>
                <p>NFSL shall take all practicable steps to ensure that all Personal Data kept is protected against unauthorised or accidental access, processing, erasure or other use.</p>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>6.2</span>
                <div>
                  <p>The factors that should be considered when storing Personal Data are:</p>
                  <ol className={styles.alphaList}>
                    <li>the type of Personal Data kept and the harm that could take place if the above listed events occurred;</li>
                    <li>the suitability of physical location where the Personal Data is stored;</li>
                    <li>the maintenance of appropriate security measures in the storage areas where the Personal Data are kept;</li>
                    <li>that all measures are taken to ensure the integrity, prudence and competence of NFSL's staff with access to the Personal Data; and</li>
                    <li>that all measures are taken for ensuring the secure transmission of Personal Data.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section id="section-7" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>7.</span> Information to Be Generally Available</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>7.1</span>
                <p>NFSL shall take all practicable steps to ensure that its policies and practices on Personal Data, are made known to its staff and clients.</p>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>7.2</span>
                <p>NFSL's data protection policy is disclosed on NFSL's website and referenced in the agreements with its clients.</p>
              </div>
            </section>

            <section id="section-8" className={styles.section}>
              <h2 className={styles.sectionTitle}><span className={styles.num}>8.</span> Access to Personal Data</h2>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>8.1</span>
                <div>
                  <p>NFSL shall allow a Data Subject or a relevant person (as defined in the Personal Data (Privacy) Ordinance) to:</p>
                  <ol className={styles.alphaList}>
                    <li>find out whether it holds Personal Data on the relevant individual i.e. the data subject or some other individual authorized by the data subject;</li>
                    <li>request access to the data at a reasonable time, on payment of a reasonable fee, with the data to be provided in a reasonable manner and in intelligible form; and</li>
                    <li>request a correction of Personal Data held by NFSL.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>8.2</span>
                <p>If a correction is necessary, NFSL must correct the information kept by it within 40 days of the receipt of the request. If NFSL refuses to provide the requested Personal Data or make the requested correction, it must give reasons for such refusal within 40 days.</p>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>8.3</span>
                <div>
                  <p>Appropriate reasons for refusal of a request for data or a correction to data include without limitation:</p>
                  <ol className={styles.alphaList}>
                    <li>NFSL has not received sufficient information to reasonably identify the requestor;</li>
                    <li>NFSL is not satisfied as to the requestor's identity or his authority to receive the data of the Data Subject;</li>
                    <li>the circumstances are such that to provide the information would reveal the Personal Data of another Data Subject;</li>
                    <li>insufficient details have been given about the data for NFSL to locate it or to decide if it is or is not accurate; and</li>
                    <li>NFSL believes that the information is not in fact inaccurate.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>8.4</span>
                <p>NFSL shall keep a logbook of each request for correction of data where NFSL has refused to comply with the request, showing full details of and reasons for the request and refusal.</p>
              </div>
              <div className={styles.clause}>
                <span className={styles.clauseNum}>8.5</span>
                <p>The Data Subject may object to the reasons given for refusal to provide or correct Personal Data.</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
