//
//  ApplePayManager.m
//  Restoapp
//
//  Created by Jesse Onolememen on 17/08/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "ApplePayManager.h"

@import PassKit;

@implementation ApplePayManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(canDeviceUserApplePay:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  resolve(@([PKPaymentAuthorizationViewController canMakePayments] && [PKPaymentAuthorizationViewController canMakePaymentsUsingNetworks:@[PKPaymentNetworkVisa, PKPaymentNetworkMasterCard, PKPaymentNetworkAmex]]));
}

@end
