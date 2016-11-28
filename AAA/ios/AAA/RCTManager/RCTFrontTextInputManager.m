//
//  RCTFrontTextInputManager.m
//  AAA
//
//  Created by bobby4en on 2016/10/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTFrontTextInputManager.h"
#import "FrontTextField.h"
#import "std.h"

@interface RCTFrontTextInputManager()

@end

@implementation RCTFrontTextInputManager

RCT_EXPORT_MODULE();
RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString);
RCT_EXPORT_VIEW_PROPERTY(placeholderTextColor, NSString);
RCT_EXPORT_VIEW_PROPERTY(fontSize, float);

- (UIView *)view
{
  return [[FrontTextField alloc] init];
}

@end
