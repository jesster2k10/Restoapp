package com.restoapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.chirag.RNMail.RNMail;
import com.actionsheet.ActionSheetPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.paypal.android.sdk.BuildConfig;
import com.actionsheet.ActionSheetPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.react.rnspinkit.RNSpinkitPackage;
import io.fullstack.oauth.OAuthManagerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.gettipsi.stripe.StripeReactPackage;
import com.pw.droplet.braintree.BraintreePackage;
import com.cardio.RNCardIOPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return true;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNMail(),
            new MapsPackage(),
            new RNSecureKeyStorePackage(),
            new RNSpinkitPackage(),
            new OAuthManagerPackage(),
            new RNDeviceInfo(),
            new StripeReactPackage(),
            new BraintreePackage(),
            new RNCardIOPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new ReactNativeLocalizationPackage(),
            new ActionSheetPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
