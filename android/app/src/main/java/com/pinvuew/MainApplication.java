package com.pinvuew;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.horcrux.svg.RNSvgPackage;
import com.brentvatne.react.ReactVideoPackage;
=======
import com.wix.reactnativenotifications.RNNotificationsPackage;
>>>>>>> pushNotif
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
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
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new RNSvgPackage(),
            new ReactVideoPackage(),
=======
            new RNNotificationsPackage(),
>>>>>>> pushNotif
            new ReactNativePushNotificationPackage(),
            new PickerPackage(),
            new FBSDKPackage(),
            new ReactNativeWheelPickerPackage(),
            new VectorIconsPackage(),
            new RNGoogleSigninPackage()
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
