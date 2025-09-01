"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServerError from "./ServerError";
import Button from "./ui/Button";
import api from "../lib/api";
import { useInfo } from "../contexts/InfoContext";


export default function ProfilePage() {

  const { setInfo, info } = useInfo();


  const router = useRouter();
  const searchParams = useSearchParams();

  // http://192.168.2.10:3000/?company_id=3&room_id=100&room_no=307
  const company_id = searchParams.get("company_id");
  const room_id = searchParams.get("room_id");
  const room_no = searchParams.get("room_no");

  const [error, setError] = useState("");
  const [noDetails, setNoDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to fetch data
  const fetchCheckinData = async (otpValue = 0) => {
    if (!company_id || !room_id || !room_no) {
      setError("Missing parameters: Company ID, Room ID, or Room No.");
      return;
    }
    setLoading(true);
    setError("");
    setNoDetails(false);

    try {
      const { data } = await api.get("/get_checkin_customer_data", {
        params: { company_id, room_id, room_no, otp: otpValue },
      });

      if (!data.status) {
        setNoDetails(true);
        setInfo({
          checkin_datetime_only_display: "---",
          checkout_datetime_only_display: "---",
          company_id: "---",
          room_id: "---",
          room_no: "---",
          room_type: "---",
          customer: {
            whatsapp: "---",
            email: "---",
            full_name: "---",
            full_address: "---",
          },
        });
        return;
      }

      const record = data.record;



      if (record) {
        // here keep it as it is and store globally also so i can access other pages also

        const payload = {
          record_id: record.id,
          booking_id: record.booking_id,
          checkin_datetime_only_display: record.checkin_datetime_only_display,
          checkout_datetime_only_display: record.checkout_datetime_only_display?.replace("---", " 12:00"),
          company_id: record.company_id,
          room_id: record.room_id,
          room_no: record.room_no,
          room_type: record.room_type,
          customer: record.customer,
        };
        console.log("🚀 ~ fetchCheckinData ~ payload:", payload)

        setInfo(payload); // ✅ stored globally

        if (otpValue == 1) {
          router.push(`/otp`);
          return;
        }

      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckinData(0); // otp 0 for initial load
  }, [company_id, room_id, room_no]);



  if (error) {
    return <ServerError />;
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
    >
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80" style={{ paddingTop: "var(--safe-top)" }}>
        <div className="mx-auto max-w-screen-sm px-4 sm:px-6">
          <div className="flex items-center justify-center py-3 gap-1">MyHotel2cloud</div>
        </div>
      </header>

      <main className="flex-1 py-4">
        <div className="mx-auto max-w-screen-sm px-4 sm:px-6 @container">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div
                className="aspect-square h-24 w-24 rounded-full bg-cover bg-center ring-2 ring-white/70 dark:ring-gray-900/60 sm:h-32 sm:w-32"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcN5Onr7O-IQ01LHXeOSVJghUxpfYCCLlGyPekLdpXwNUq_4EDSb0ftRSAqC4MYbNuBHet_OjNyV-aUCZ986o_Ycq08v2B5aJEPm6gLqzve1WTGxnlgN_6NMY9Q97PAZlNXeRiwSAcq1_mUL0PZj6QMyK55cmp2dfthbZfavH9uzum4h4LIolk9r-TVydGL0cWCKvbZwfMozo6O48RRE2tIWPDROGPqCak8W7vdhZ8ckrtkRdjGNfMj8ZZxBetxi80d90nZSTcy-w')`,
                }}
              ></div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-bold sm:text-2xl">{info.customer.full_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">{info.customer.whatsapp}</p>
            </div>
          </div>

          <section className="mt-6 space-y-5 sm:mt-8">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Full Name</span>
                <input
                  className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  value={info.customer.full_name}
                  readOnly
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Email</span>
                <input
                  type="email"
                  className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  value={info.customer.email}
                  readOnly
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Room Number</span>
                <input
                  className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  value={info.room_no}
                  readOnly
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Room Category</span>
                <input
                  className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  value={info.room_type}
                  readOnly
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Check In</span>
                <input
                  className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  value={info.checkin_datetime_only_display}
                  readOnly
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Check Out</span>
                <input
                  className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  value={info.checkout_datetime_only_display}
                  readOnly
                />
              </label>
            </div>
          </section>
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 bg-white/90 backdrop-blur dark:bg-gray-950/90" style={{ paddingBottom: "calc(1rem + var(--safe-bottom))" }}>
        <div className="mx-auto max-w-screen-sm px-4 sm:px-6">
          <div className="py-3">
            {/* how to disable if noDetails is true*/}
            <Button
              onClick={() => fetchCheckinData(1)}
              disabled={noDetails} // ✅ disable if noDetails is true
              className={noDetails ? "opacity-50 cursor-not-allowed" : ""}
            >
              Enter
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
