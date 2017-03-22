package com.mateapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.mikemonteith.reactnativeandroidcheckbox.CheckboxPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rhaker.reactnativeselectcontacts.ReactNativeSelectContacts;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSendIntentPackage(),
          new CheckboxPackage(),
          new ReactNativeSelectContacts(),
          new ContactsWrapperPackage(),
          new RNSmsAndroidPackage()
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
