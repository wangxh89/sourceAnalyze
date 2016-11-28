//
//  std.h
//  DRM_iOS
//
//  Created by bobby4en on 16/3/22.
//  Copyright © 2016年 bobby4en. All rights reserved.
//

#import <Foundation/Foundation.h>

//判断是否为空
#define objectOrNull(obj) ((obj) ? (obj) : [NSNull null])
#define objectOrEmptyStr(obj) ((obj) ? (obj) : @"")

#define isNotNull(x)             (x && ![x isKindOfClass:[NSNull class]])
#define toInt(x)              (!isNotNull(x) ? 0 : [x intValue])
#define isEmptyString(x)      (!isNotNull(x) || [x isEqual:@""] || [x isEqual:@"(null)"])

//图片
#define kPlaceholderRoundWidth(_width_) [UIImage imageNamed:[NSString stringWithFormat:@"placeholder_drm_%d", _width_]]

//颜色
#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]
#define RGBA(r,g,b,a)         [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]
#define RGB(r,g,b)            [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:1.0]

//字体
#define BoldSystemFont(size)  [UIFont boldSystemFontOfSize:size]
#define systemFont(size)      [UIFont systemFontOfSize:size]
#define kNormalFont [UIFont systemFontOfSize:14]
#define getFont(n,s) [UIFont fontWithName:n size:s]

//版本号
#define kVersion_Coding [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]
#define kVersionBuild_Coding [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"]

//系统相关
#define kDevice_Is_iPhone4 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO)
#define kDevice_Is_iPhone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)
#define kDevice_Is_iPhone6 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(750, 1334), [[UIScreen mainScreen] currentMode].size) : NO)
#define kDevice_Is_iPhone6Plus ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1242, 2208), [[UIScreen mainScreen] currentMode].size) : NO)

//屏幕的宽高
#define SCREEN_WIDHT [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height
#define STATUES_BAR_HEIGHT [[UIApplication sharedApplication] statusBarFrame].size.height
#define NAVIGATIOR_BAR_HEIGHT navigationController.navigationBar.frame.size.height
#define kMySegmentControl_Height 44.0

//其他
#define OS_TYPE @"IOS"
#define OS_VERSION [UIDevice currentDevice].systemVersion
#define kKeyWindow [UIApplication sharedApplication].keyWindow
#define stringFormat(s, ...) [NSString stringWithFormat:(s),##__VA_ARGS__]
#define sleep(s);             [NSThread sleepForTimeInterval:s];
#define Syn(x)                @synthesize x = _##x
#define _image(x) [UIImage imageNamed:x]
#define DebugLog(s, ...) NSLog(@"%s(%d): %@", __FUNCTION__, __LINE__, [NSString stringWithFormat:(s), ##__VA_ARGS__])
#define PhotosMessageDir ([[NSString documentPath] stringByAppendingPathComponent:@"/PhotosMessageDir/"])
