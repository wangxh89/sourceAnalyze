//
//  FrontTextField.m
//  DRM_iOS
//
//  Created by bobby4en on 16/3/28.
//  Copyright © 2016年 bobby4en. All rights reserved.
//

#import "FrontTextField.h"
#import "std.h"

@implementation FrontTextField

-(void)setPlaceholderTextColor:(NSString *)placeholderTextColor
{
  [self setValue:UIColorFromRGB(strtoul([[placeholderTextColor stringByReplacingOccurrencesOfString:@"#" withString:@"0x"] UTF8String],0,16)) forKeyPath:@"_placeholderLabel.textColor"];
}

-(void)setFontSize:(float)fontSize{
  [self setFont:systemFont(fontSize)];
}

- (CGRect)textRectForBounds:(CGRect)bounds{
    return CGRectInset(CGRectMake(bounds.origin.x, bounds.origin.y
                                  , bounds.size.width-self.rightView.bounds.size.width + 10, bounds.size.height), 10, 0);
}

- (CGRect)placeholderRectForBounds:(CGRect)bounds{
    return CGRectInset(CGRectMake(bounds.origin.x, bounds.origin.y
                                  , bounds.size.width-self.rightView.bounds.size.width + 10, bounds.size.height), 10, 0);
}

- (CGRect)editingRectForBounds:(CGRect)bounds{
    return CGRectInset(CGRectMake(bounds.origin.x, bounds.origin.y
                                  , bounds.size.width-self.rightView.bounds.size.width + 10, bounds.size.height), 10, 0);
}

@end
