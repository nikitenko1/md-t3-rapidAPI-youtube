import "../styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { trpc } from "utils/trpc";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "components/AuthWrapper";
import Layout from "components/Layout";

TimeAgo.addDefaultLocale(en);
// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <RecoilRoot>
            <Toaster position="bottom-left" />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </AuthWrapper>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
