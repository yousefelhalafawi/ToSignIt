"use client";

import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./_redux/store";
import CookieConsent from "react-cookie-consent";

function LocalizedCookieConsent() {
  const { t } = useTranslation();
  return (
    <CookieConsent
      location="bottom"
      buttonText={t("cookieConsent.buttonText")}
      style={{ background: "#5862E8", alignItems: "center" }}
      buttonClasses="cookie-button"
      expires={150}
    >
      {t("cookieConsent.text")}
    </CookieConsent>
  );
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <LocalizedCookieConsent />
          {children}
        </I18nextProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
