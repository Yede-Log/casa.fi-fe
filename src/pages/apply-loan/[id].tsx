
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BreadcrumbExample } from '@/components/Breadcrumbs';
import { LoanForm } from './components/LoanForm';

export default function ApplyLoan() {

  const router = useRouter();
  const offer_id = router?.query?.id?.toString();

  return (
    <>
        <Head>
            <title>Apply Loan</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BreadcrumbExample 
            data={[{
              title: "Offers",
              link: "/offers"
          }]}
            active={"Apply Loan"}
        />
        <main id="main-div">
            <div className="main-box p-3">
          {
              offer_id ? (
                <LoanForm 
                  offer_id = {router.query.id?.toString() ?? ""}
                />
              ) : (
                <>Loading...</>
              )
          }
          </div>
            
        </main>
    </>
  )
}
