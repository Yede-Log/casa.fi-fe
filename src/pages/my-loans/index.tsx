
import Head from 'next/head'
import { BreadcrumbExample } from '@/components/Breadcrumbs';
import MyLoansTable from './components/MyLoanTable';



export default function ApplyLoan() {
  return (
    <>
        <Head>
            <title>View My Loans</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BreadcrumbExample 
            data={[]}
            active={"My Loans"}
        />
        <main id="main-div">
            <div className="main-box p-3">
              <MyLoansTable />
            </div>
        </main>
    </>
  )
}
