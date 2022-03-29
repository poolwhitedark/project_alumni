/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : xiaohazhiyou

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 29/03/2022 22:02:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性格介绍',
  `love` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '爱情观',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案值',
  `profile` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '概述',
  `career` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of answer
-- ----------------------------
INSERT INTO `answer` VALUES (1, '注重实际的现实主义者，关注事实；天生的商业和力学头脑；对他们认为没有用处的科目不感兴趣，但在必要时也能专注其中；喜欢组织并管理活动。如果能考虑到别人的情感、感受和观点的话，能够将事情管理得非常出色。', '在他们的心中，上帝是第一位的，接着是家庭和朋友。他们会花费大量的精力来履行他们的职责和义务，并会根据他们所认为事情的重要性来排定先后顺序。他们对感情充满投入和奉献，在他们看来这段感情就是需要为系一生不能更替的。', 'ESTJ', '务实果断的监管者', NULL);
INSERT INTO `answer` VALUES (2, '手艺人是使用工具的超级能手，他们具有使人赞叹不已绝妙技巧，他们胆大心细，喜欢不断尝试新事物，挑战自己，虽然话不多，但是他们往往用自己的行动来折服他人，并获得社会对自己的认可。这就是神奇的手艺人', '最佳恋爱对象完美主义者，你期望另一半拥有的特质，是忠诚、安全感和责任感。对于另一半提出的未来或崇高的理想你并不会特别感动；你要知道的是对方现在可以为一段认真的感情带来什么。', 'ISTJ', '谦逊高效的手艺人', NULL);
INSERT INTO `answer` VALUES (3, '保卫者所生活的世界实在而平和。他们非常热情亲切，总是愿意相信别人好的方面。他们重视和谐与合作，对他人的感受通常也会十分敏感。人们尊重Ta，不仅因为他们考虑周到、观察仔细，还因为他们总是能通过自己对别人良好的愿景来挖掘他人的潜力，全世界最暖的人就是你了吧。', '执子之手，与子偕老说的就是你这种人吧，保卫者对于感情十分投入，传统而且顾家，他们将伴侣和家人的快乐视为自己生命中最重要的事情。', 'ISFJ', '有强烈责任感的保卫者', NULL);
INSERT INTO `answer` VALUES (4, '热心，健谈，合群，认真尽责；是“天生的合作者”、活跃的“委员会成员”。总是善待他人。在受到充分的鼓励和赞扬时表现出色。对抽象的思考和技术性的课题缺乏兴趣。主要兴趣在于那些能直接的、可见地影响人们生活的事情。', '对于最会照顾人的你来说，内心最深层非常希望拥有一个近乎完美的婚礼，热闹非凡的气氛、让人垂涎欲滴的美食、欢快跳动的音乐、久久不散的欢笑、和你山盟海誓的约定。', 'ESFJ', '充满正能量的合作者', NULL);
INSERT INTO `answer` VALUES (5, '开拓者类型反应快、睿智，有激励别人的能力，警觉性强、直言不讳。在解决新的、具有挑战性的问题时机智而有策略。善于找出理论上的可能性，然后再用战略的眼光分析。善于理解别人。不喜欢例行公事，很少会用相同的方法做相同的事情，倾向于一个接一个的发展新的爱好。', '激情似火，向上乐观。极强的人格魅力、受打击后可以很快走出来。开拓者的人很需要精神上的交流和支持，需要那种一同奋斗、一同寻找乐趣、一起喜欢一个东西，甚至于一同成长的对象。', 'ENTP', '打破规则的开拓者', NULL);
INSERT INTO `answer` VALUES (6, '分析者型的人是伟大的领导者和作决定的人。他们是天才的思想家和长远规划者。因为非常实际，逻辑性又强，他们善于做那些需要推理和智慧的工作。ENTJ型的人在作计划和研究新事务时是很系统化的。而且天生是热心坦诚的领导者。他们善于组织群众，生活非常严谨而且期望别人也是如此。因此，他们愿意挑战并且让其他人也像他们一样努力奋斗。', '作为一个理性思维、性格强势、喜欢掌控事物走向、追求成就感的人，大概我的爱情观就是，遇到心动的人，默默对他好，直到不再心动为止。', 'ENTJ', '善于分析的决策者', NULL);
INSERT INTO `answer` VALUES (7, '完美主义者喜欢追根究底，擅长策略性思维，善于将事情概念化，善于从整体上把握事物，能够接受建设性的批评，而不把它当作针对个人的问题', '作为完美主义者和头脑至上主义，这大概率就是要孤独终老的类型了吧。你并不会无缘无故坠入爱河之中，喜不喜欢TA都会摆在脸上。当然，作为完美主义者，你追求对等关系，人格独立和相互尊重。但如果感情阻碍了彼此的个人发展，对不起，完美主义者只能对这段感情说byebye！', 'INTJ', '独立自信的完美主义者', NULL);
INSERT INTO `answer` VALUES (8, '沉默、自主、思维敏捷、洞察力强。喜欢理论上或科学方面的追求。喜爱用逻辑和分析解决问题。喜欢提出新的见解和主张，不大喜欢聚会和闲聊天。喜欢从事与自己的兴趣或爱好相适应的职业。客观、批判性强，倾向于通过自己的思考去寻找事物的基本原理。可以独立解决问题，对一个观点或形势能做出超出常人的独立的准确分析。经常提出尖锐的问题，向他人及自己挑战以发现新的合乎逻辑的方法。', '被称为最温暖的机器人的你们，其实寻找的爱情正是未来的自己。希望对方身上有的正是自己会拥有的。在洞察者的脑海中有一个标准化的恋人形象，当符合特征的人出现在眼前，他们极有可能一见钟情。', 'INTP', '富有洞察力的观察者', NULL);
INSERT INTO `answer` VALUES (9, '劝告者喜欢独处，性格复杂，有深度，是独立的思考者。忠诚、有责任心，喜欢解决问题，通常在认真思考之后行动。在同一时间内只专注一件事情。', '感情中的优点：天生热情，且对他人具有认同感，为追求真挚的感情不顾一切，敏感且关心他人的感受，通常具有良好的沟通技巧，尤其是书面的对承诺非常认真，并寻求终生关系。', 'INFJ', '坚持自己价值观的劝告者', NULL);
INSERT INTO `answer` VALUES (10, '治疗者做事细致而缜密，他们能够很好地倾听他人所想并能平息人们心中的波澜。尽管在感情表达上他们可能有一点保守，但他们有着他人极强的关护心，并会努力去理解他人的感受。治疗者的这种真诚常常能让他人感动，所以在人际交往中常被他人放在最为亲近的位置。在与自己熟识的人交往过程中，治疗者表现得非常热情友好。当他们的价值观受到威胁之际，他们会摆出极具侵略性的守护态势，并为自己的主张而奋力应战。', '治疗者的内心世界是十分复杂的。在人际交往的过程中，这种复杂会让他们表现出比其他性格类型人群更多的爱与关怀。', 'INFP', '感他人所感,伤他人所伤的治疗者', NULL);
INSERT INTO `answer` VALUES (11, '供应者是指的就是供应者， 供应是提供给他人生活必需品的行为，供应者天生就热衷于为他人服务，保证他们具有物资充足感和群体归属感。他们自觉承担起照顾身边的人和安排其福利待遇的责任，他们也是理想主义者型中，最喜爱交际的人。无论走到都会承担着社会奉献者的角色，愉快的付出自己的时间和精力，以确保别人的需要得到满足、传统得到维持和发展，并圆满的履行其社会职责。', '供应者是“热情奔放、敢爱敢恨、好为人师”的社交达人,会很快在适合的环境遇见对的人', 'ENFJ', '为人民服务的供应者', NULL);
INSERT INTO `answer` VALUES (12, '追梦者是健谈热诚，友善的；聪明好奇，爱玩的；关心体贴，温柔敏感；富有想象力，颇具创新精神；智慧乐观，适应能力强，但有时做事无条理。', '我们可以给你无穷无尽的爱和信任，愿意无条件的支持你赞美你，但是往往我们期待伴侣会做同样的事，如果他们做不到，pass。', 'ENFP', '热枕而充满新思想的追梦者', NULL);
INSERT INTO `answer` VALUES (13, '虽然他们是内向型，在他们和别人的交流中他们通常占据主动权，可能对他人造成强烈影响。他们专注于高效和巧妙地完成工作。思考者们同意别人按他们自己的方式过活，只要别人能够包容他们。', '如果我真的是动心了,爱上了,非常非常深刻,长情还是有可能的。否则长情对思考者是坎坷和需要长期考验的。', 'ISTP', '安静独立的思考者', NULL);
INSERT INTO `answer` VALUES (14, '艺术家友好谦逊，感情投入；关心熟人，并能真挚的对待；对批评很敏感，容易受伤；温柔文静，谈吐文雅；很现实，但平易近人沉静，友善，敏感和仁慈。欣赏和他们周遭所发生的事情。喜欢有自己的空间，做事又能把握自己的时间。忠于自己的价值观，忠于自己所重视的人。不喜欢争论和冲突，不会强迫别人接受自己的意见或价值观。', '艺术家的追求的爱情有点理想化，就是希望谈一次恋爱就能一直在一起那种，追求有真实情感的爱情（一定要足够喜欢），宁缺勿泛，不想将就，认为在爱情里双方都是平等的，要有付出才有回报，喜欢能理解自己，相处起来很舒服的人。', 'ISFP', '敏感而友善的艺术家', NULL);
INSERT INTO `answer` VALUES (15, '善于看出眼前的需要，并迅速做出反应来满足这种需要，天生爱揽事并寻求满意的解决办法。积极活跃，随遇而安，乐于享受今天。倾向于通过逻辑分析和推理做出决定，不会感情用事。如果形势需要，你会表现出坚韧的意志力。偏爱灵活地处理实际情况，而不是根据计划办事。', '挑战者很容易喜新厌旧，他们会不断更迭自己的爱情伴侣知道他们能找到其他的途径来派遣自己的厌倦情绪。他们的生活是以天为计算单位的，长期的交往关系可不是ESTP想要的。', 'ESTP', '思维开阔，敏锐乐观的挑战者', NULL);
INSERT INTO `answer` VALUES (16, '表演者型的人乐意与人相处，有一种真正的生活热情。他们顽皮活泼，通过真诚和玩笑使别人感到事情更加有趣。表演者型的人脾气随和、适应性强，热情友好和慷慨大方。他们擅长交际，常常是别人的“注意中心”。他们热情而乐于合作地参加各种活动和节目，而且通常立刻能应对几种活动。', '表演者对于那些对直觉或思考官能有很高要求的感情，他们通常会采取逃避的态度。他们倾向于轻松惬意的生活方式，但在感情面前他们总是十分深沉的。', 'ESFP', '活泼有趣，热情饱满的表演者', NULL);

-- ----------------------------
-- Table structure for career
-- ----------------------------
DROP TABLE IF EXISTS `career`;
CREATE TABLE `career`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `career_name` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职业名称',
  `stars` int(11) NULL DEFAULT NULL COMMENT '星级',
  `industry` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '行业',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `career_name`(`career_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of career
-- ----------------------------
INSERT INTO `career` VALUES (4, 'web前端', 4, '互联网');
INSERT INTO `career` VALUES (5, '大数据工程师', 4, '大数据');
INSERT INTO `career` VALUES (6, '软件测试', 3, '互联网');
INSERT INTO `career` VALUES (7, '运维工程师', 4, '互联网');
INSERT INTO `career` VALUES (8, '网络工程师', 4, '互联网');
INSERT INTO `career` VALUES (9, '系统管理员', 4, '互联网');
INSERT INTO `career` VALUES (11, '系统工程师', 4, '网络安全');
INSERT INTO `career` VALUES (12, '网络安全工程师', 4, '网络安全');
INSERT INTO `career` VALUES (13, '系统安全工程师', 4, '网络安全');
INSERT INTO `career` VALUES (14, '数据库管理', 4, NULL);
INSERT INTO `career` VALUES (15, 'Android开发', 4, NULL);
INSERT INTO `career` VALUES (16, 'Flash开发', 4, '互联网');
INSERT INTO `career` VALUES (17, 'U3D开发', 4, '游戏');
INSERT INTO `career` VALUES (18, '税务审计', 3, '财会');
INSERT INTO `career` VALUES (19, '保险', 4, NULL);
INSERT INTO `career` VALUES (20, 'COCOS2DX开发', 4, NULL);
INSERT INTO `career` VALUES (21, '嵌入式开发员', 4, NULL);
INSERT INTO `career` VALUES (22, '通信技术工程师', 4, NULL);
INSERT INTO `career` VALUES (23, '数据通讯工程师', 4, NULL);
INSERT INTO `career` VALUES (24, '集成电路IC设计', 4, NULL);
INSERT INTO `career` VALUES (25, '智能驾驶系统工程师', 4, NULL);
INSERT INTO `career` VALUES (26, '人工智能', 4, NULL);
INSERT INTO `career` VALUES (27, '人像修图师', 4, NULL);
INSERT INTO `career` VALUES (28, 'Flash设计师', 4, NULL);
INSERT INTO `career` VALUES (29, 'UI设计师', 5, 'UI');
INSERT INTO `career` VALUES (30, '游戏视觉设计', 4, '游戏');
INSERT INTO `career` VALUES (31, '多媒体设计师', 4, NULL);
INSERT INTO `career` VALUES (32, '自动化测试', 4, NULL);
INSERT INTO `career` VALUES (33, '性能测试', 4, NULL);
INSERT INTO `career` VALUES (34, '交互设计师', 4, NULL);
INSERT INTO `career` VALUES (35, '数据分析师', 4, NULL);
INSERT INTO `career` VALUES (36, '给排水工程师', 4, NULL);
INSERT INTO `career` VALUES (37, '建筑设计师', 4, NULL);
INSERT INTO `career` VALUES (38, '电气工程师', 4, NULL);
INSERT INTO `career` VALUES (39, '投资经理', 4, NULL);
INSERT INTO `career` VALUES (40, '律师', 4, NULL);
INSERT INTO `career` VALUES (41, '市场营销', 4, NULL);
INSERT INTO `career` VALUES (42, '环保工程设计师', 4, NULL);
INSERT INTO `career` VALUES (43, '生化研发工程师', 4, NULL);
INSERT INTO `career` VALUES (44, '自动化工程师', 4, '自动化');
INSERT INTO `career` VALUES (45, '会计师', 5, NULL);
INSERT INTO `career` VALUES (46, 'python开发', 4, '大数据');
INSERT INTO `career` VALUES (47, 'iOS开发', 4, '互联网');

-- ----------------------------
-- Table structure for career_detail
-- ----------------------------
DROP TABLE IF EXISTS `career_detail`;
CREATE TABLE `career_detail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `career_id` int(11) NULL DEFAULT NULL,
  `basic_focus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `basic_introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `twoer_focus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `twoer_introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `intermidate_focus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `intermidate_introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `advance_focus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `advance_introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of career_detail
-- ----------------------------
INSERT INTO `career_detail` VALUES (1, 29, '掌握ps，AI，CDR,Axure的使用软件&熟悉UI手绘&培养自己的创新意识', 'UI作品设计', '熟练操作PS、AI、PR、AE等图形和视频制作相关软件&熟练使用Flash或An等工具&熟练使用Flash的矢量方式绘制角色，场景，道具', '基本软件的使用', '学习场景设计&学习掌握形象制作&学习声音制作&学习动画合成', '动画设计', '提升动画环境渲染能力&培养创新思维&提升设计能力与表现能力', '创意的思维培养和环境渲染能力的表现与增强');
INSERT INTO `career_detail` VALUES (3, 44, '学习掌握PLC编程&PLC控制柜设计&掌握常见DCS系统软件的使用&熟悉自动控制理论', 'PLC相关技能学习', '看懂电气原理图,掌握基础工艺知识,能根据原理图进行接线,了解客户需求', '自动化基础知识', 'PLC高级自动化实现,可根据自动化要求完成系统设计,熟练使用组态软件编写,能够组织自动化工程施工', '系统架构设计', '能够把控产品研发方向,熟悉产品需求设计,用的SCL、C或者VB等辅助设计,熟悉编写自动化控制项目方案书', '更多能力拓展');
INSERT INTO `career_detail` VALUES (4, 4, 'http数据通信基础&学习AJAX技术&学习js/jquery组件化封装开发', 'js高级组件化开发', 'html5和css3基础知识&几种网页的基本布局&js语法基本了解', '基础网页布局，html,css相关知识', 'webapp开发&小程序开发&浏览器原理&前端代码性能优化', 'webapp、小程序的开发', '主流框架的学习（vue.js、React.js等）&node.js服务端渲染技术了解&主流数据库的连接使用&掌握webpack、JULP技术', '各种主流框架的学习和应用');
INSERT INTO `career_detail` VALUES (5, 5, '学习高等代数&学习概率与统计&学习离散数学&学习数值分析', '数学', 'linux虚拟机的操作和文件编辑&掌握hadoop、spark分布式框架&学习并深入了解SQL语言和数据仓库', 'linux系统学习、分布式计算框架及数据库', '掌握python、java或者Scala&了解掌握搜索算法&熟练运用分类、聚类算法等其他算法', '编程和基础算法', '分类、回归、聚类等问题的数据建模&训练模型和调优&熟悉模型诊断', '机器学习和模型搭建');
INSERT INTO `career_detail` VALUES (6, 7, '熟悉开源的监控平台工具，比如：Ganglia、Nagios、Zabbix等&熟练掌握Shell脚本熟悉Awk、Sed等基础工具&熟悉分布式计算或者存储系统，比如Hadoop/Hbase/Storm等&熟悉TCP/IP、HTTP等网络协议，精通socket网络编程', '熟悉系统、工具和协议', '精通shell/Python/Perl等1至2种编程语言&熟练掌握常用数据结构和算法，并能灵活运用&熟悉网络基础知识&能够通过技术手段模拟实际的用户请求，测试整个系统所能承担的最大吞吐', '基础技能', '深入理解Linux操作系统&明白机器学习原理并实践能够基于容量评估数据，判断系统的瓶颈并提供容量优化的解决方案', '精通学习', '针对不同的问题，不断补充扩大的知识和研究范畴。&体系化的服务运维理解&对于产品的理解透彻&为了支持产品的不断迭代，需要不断的进行架构优化调整,能够快速迭代产品', '拓展学习');
INSERT INTO `career_detail` VALUES (7, 45, '学习《初级会计实务》&学习《经济法基础》', '初级会计职称', '学习基础会计学&学习财务管理学&学习微观经济学与宏观经济学', '会计理论知识学习', '学习《中级会计实务》&学习《财务管理》&学习《经济法》', '中级会计职称', '学习《高级会计实务》', '高级会计职称');
INSERT INTO `career_detail` VALUES (8, 11, '学习并考取微软Win2000的MCSE&准备Cisco 的CCNA认证考试', '了解行业', '了解多种安全攻防技术&了解主流unix/linux、windows平台的设计、实施工&熟悉Mysql数据库、oracle数据库、sqlserver、db2等主流数据库&具备良好的沟通能力和团队协作精神及较好的文档能力', '职业要求', '工作实践&考取Novell的网络认证&考取Cisco的CCNP（实践为主）', '高手之路', '考取Cisco 的CCIE&获得Unix和IBM的AS/400相关认证', '成神');
INSERT INTO `career_detail` VALUES (9, 46, '学习Python库&正则表达式&学习了解进程线程&学习了解爬虫&遍历以及MySQL数据库', 'Python语言高级', '主要学习如Python3、数据类型、字符串、函数、类、文件操作等&阶段课程结束后，学员需要完成Pygame实战飞机大战、2048等项目', 'Python语言基础', '主要学习HTML、CSS、JavaScript、jQuery等前端知识&掌握python三大后端框架（Django、 Flask以及Tornado&需要完成网页界面设计实战；能独立开发网站', 'Python Web开发', '主要学习Python开发Linux运维&Linux运维报警工具开发&Linux运维报警安全审计开发&Linux业务质量报表工具开发', 'Linux运维自动化开发');
INSERT INTO `career_detail` VALUES (10, 47, '熟练使用大部分iOS平台常用库&关注github上iOS平台开源项目最近趋势&理解ResfulAPI概念&理解Beeframework类hybird框架结构原理', '熟练使用大部分iOS平台常用库', '熟练掌握C/C++/Objective-C/Swift语言&熟悉CodeRunner编译器，了解编译器的快捷按键以及各个功能&学习相关语法以及关键字&阅读iOS开发书籍，开发者博客', '熟练掌握C/C++/Objective-C/Swift语言，熟悉CodeRunner编译器', '能够fork一些著名开源库&能够使用Restkit,进行网络资源传输&能够使用Git进行版本控制管理&熟悉Cocoa Touch(Foundation,UIKit)、Objective-C中block，gcd，NSOperation等', '掌握这些技能能够基本满足市场招人水准', '研究每年WWDC上推荐的最近方法技术，对代码进行重构升级&熟悉ios上架苹果商店流程&熟练使用开源库(AFNetworking，SDWebImage，fmdb)&熟练使用开源控件(EGOTableViewPullRefresh,MRProgress)', '进阶必备');
INSERT INTO `career_detail` VALUES (11, 14, '考一个数据库的认证&考一个操作系统的认证&能够独立开发数据库管理系统和数据库应用软件系统', '认证', '学会一门数据库软件&起码要知道和会使用几种操作系统&掌握对用户的增加和删除以及限制等操作&熟悉网络知识&至少掌握一种开发语言', '基础', '学会2个或者更多数据库软件&积累经验，具备分布式数据库的管理和优化经验&熟悉数据库的运维和优化&熟悉数据库相关故障的排除', '晋升', '熟悉数据库架构设计、Schema设计、容量规划&数据库运维相关系统开发&能够监控平台的研发、应用，服务监控准确性、实时性、全面性', '任职');
INSERT INTO `career_detail` VALUES (12, 16, '熟悉一套UI框架&掌握场景的基本操作&巧妙编辑图形对象&熟悉创建与应用图层', '掌握场景的基本操作', '学会使用Flash cs6或者Flash 8编辑器&熟悉一种设计模式&一周看完（Flash ActionScript 3殿堂之路）&看完官方的ActionScript 3.0 开发人员指南', '学会使用Flash cs6或者Flash 8编辑器', '自己写出一套UI框架&熟悉应用图像，声音和视频&熟悉应用时间轴和帧&制作Flash交互式动画', '掌握这些技能能够基本满足市场招人水准', '掌握多套UI框架&应用“库”面板&制作逐帧动画&应用ActionScript', '进阶必备');
INSERT INTO `career_detail` VALUES (14, 17, '学习C#语言高级&U3D粒子系统&U3D数据处理&学习掌握U3D动画技术', '学习掌握U3D动画技术', '有C、C++、C#或LUA语言编程基础&了解U3D脚本&了解PS图像基础&了解U3D界面UI', '有C、C++、C#或LUA语言编程基础', '熟悉Unity3D引擎架构设计&掌握U3D行为树&掌握U3D数据处理&掌握Shader的修改和创建&掌握这些技能能够基本满足市场招人水准', '掌握这些技能能够基本满足市场招人水准', '熟悉Unity3D的shaderlab语言和物理引擎&精通Unity3D游戏引擎和3D动画方面的知识&能够快速理解游戏UI交互逻辑的设计，编写相关功能模块的代码&熟悉使用Unity中的Javascript/C#完成关卡的制作', '进阶必备');
INSERT INTO `career_detail` VALUES (15, 18, '了解税务相关法律&整理、归档审计资料&审查发票、凭证、账册、报表的真实性以及其填制是否符合企业财务制度的要求', '审查工作的相关的能力', '会整理案卷及其相关资料&熟悉审查企业各项财务制度的落实情况&对企业的各个开支情况有一定大致了解', '了解税务审计的相关工作', '获得充分的审计证据&具有终身学习的能力&支持审计发现和审计建议，以为企业运营提供增长服务', '制定审定程序与审定方案', '债权债务的增减情况，固定资产的管理&较强的抗压能力&进行企业保密工作，按规定使用所获取的财务资料', '审查企业各项财务制度的落实情况，并拟定审计计划或方案');
INSERT INTO `career_detail` VALUES (16, 18, '了解税务相关法律&整理、归档审计资料&审查发票、凭证、账册、报表的真实性以及其填制是否符合企业财务制度的要求', '审查工作的相关的能力', '会整理案卷及其相关资料&熟悉审查企业各项财务制度的落实情况&对企业的各个开支情况有一定大致了解', '了解税务审计的相关工作', '获得充分的审计证据&具有终身学习的能力&支持审计发现和审计建议，以为企业运营提供增长服务', '制定审定程序与审定方案', '债权债务的增减情况，固定资产的管理&较强的抗压能力&进行企业保密工作，按规定使用所获取的财务资料', '审查企业各项财务制度的落实情况，并拟定审计计划或方案');
INSERT INTO `career_detail` VALUES (17, 45, '学习《初级会计实务》&学习《经济法基础》', '初级会计职称', '学习基础会计学&学习财务管理学&学习微观经济学与宏观经济学', '会计理论知识学习', '学习《中级会计实务》&学习《财务管理》&学习《经济法》', '中级会计职称', '学习《高级会计实务》', '高级会计职称');
INSERT INTO `career_detail` VALUES (18, 45, '学习《初级会计实务》&学习《经济法基础》', '初级会计职称', '学习基础会计学&学习财务管理学&学习微观经济学与宏观经济学', '会计理论知识学习', '学习《中级会计实务》&学习《财务管理》&学习《经济法》', '中级会计职称', '学习《高级会计实务》', '高级会计职称');
INSERT INTO `career_detail` VALUES (19, 45, '学习《初级会计实务》&学习《经济法基础》', '初级会计职称', '学习基础会计学&学习财务管理学&学习微观经济学与宏观经济学', '会计理论知识学习', '学习《中级会计实务》&学习《财务管理》&学习《经济法》', '中级会计职称', '学习《高级会计实务》', '高级会计职称');
INSERT INTO `career_detail` VALUES (20, 45, '学习《初级会计实务》&学习《经济法基础》', '初级会计职称', '学习基础会计学&学习财务管理学&学习微观经济学与宏观经济学', '会计理论知识学习', '学习《中级会计实务》&学习《财务管理》&学习《经济法》', '中级会计职称', '学习《高级会计实务》', '高级会计职称');
INSERT INTO `career_detail` VALUES (21, 8, '学习考证，目前主流的证书有思科、华为、华三等&项目实习，集成商会在有项目的时候，临时招一些实习生，这种机会不要错过', '初级阶段', '精通路由、交换，熟悉掌握相关技术知识。&项目实施。开始独立做项目实施交付，给客户做培训。&学习其他方面的知识。系统集成行业，工程师常常分为网络工程师和系统工程师。学习一下Linux，了解一下云计算，Openstack等目前主流技术', '中级阶段', '职业技能提升，技术、方案能力提升等等&负责机房内的网络联接及网络间的系统配置&自我提升,例如学习新技能', '高级阶段', '负责网络平台的运作方向以及平台维护管理等工作&负责网络平台信息的采集和录入支持&负责网络平台的推广方向和推广模式&负责计算机间的网络联接及网络共享', '提升方向');

-- ----------------------------
-- Table structure for feed_back
-- ----------------------------
DROP TABLE IF EXISTS `feed_back`;
CREATE TABLE `feed_back`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of feed_back
-- ----------------------------
INSERT INTO `feed_back` VALUES (1, '怎么入驻啊', '13453751197', '2020-08-10 18:14:32');
INSERT INTO `feed_back` VALUES (2, '这个软件怎么用啊', '17376554257', '2020-08-11 15:09:04');
INSERT INTO `feed_back` VALUES (3, '这个软件怎么用啊', '17376554257', '2020-08-12 11:13:24');
INSERT INTO `feed_back` VALUES (8, '1234567890', '', '2020-08-17 08:15:00');

-- ----------------------------
-- Table structure for follow_fans
-- ----------------------------
DROP TABLE IF EXISTS `follow_fans`;
CREATE TABLE `follow_fans`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `follow_id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '关注的人id',
  `fans_id` int(11) NULL DEFAULT NULL COMMENT '粉丝id',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of follow_fans
-- ----------------------------
INSERT INTO `follow_fans` VALUES (10, 21, '19', NULL, '2020-08-15 21:09:37', NULL);
INSERT INTO `follow_fans` VALUES (11, 19, '21', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for local_auth
-- ----------------------------
DROP TABLE IF EXISTS `local_auth`;
CREATE TABLE `local_auth`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '注册时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of local_auth
-- ----------------------------
INSERT INTO `local_auth` VALUES (25, 5, '17376554257', '$2a$10$YYB2txFbPM4MqfoA.xabsu8BFDGkV6sf6DmfPaEOvD33SZSodsO6u', '2020-08-16 15:49:27');
INSERT INTO `local_auth` VALUES (26, 7, '13453774185', '$2a$10$fwJVXvJkDcW8oR42lFMf8efX9y88ly0TKWUeE3cR5cDtw0roKWzRq', '2020-08-17 07:56:22');
INSERT INTO `local_auth` VALUES (28, 14, '15671814178', '$2a$10$nTn17WAvJEMB1RGLmqqUK.MscH3WWr0SALajORb6NaD2K0p2KLFz.', '2020-08-17 15:29:27');
INSERT INTO `local_auth` VALUES (29, 16, '15857172796', '$2a$10$N1Gxrm0Bbee.bAVekC0Up.hM00gNrPSgqMEDBPNpmO.m/faizBsvG', '2020-08-17 16:03:08');

-- ----------------------------
-- Table structure for oauth
-- ----------------------------
DROP TABLE IF EXISTS `oauth`;
CREATE TABLE `oauth`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `open_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `session_key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `oauth_type` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oauth
-- ----------------------------
INSERT INTO `oauth` VALUES (3, 15, 'oy1QG5jBi2XhR6_jSsIPzhaFu9H4', 'kfcYYq3ygBiyJI5D1ZYFhw==', NULL);

-- ----------------------------
-- Table structure for oauth_type
-- ----------------------------
DROP TABLE IF EXISTS `oauth_type`;
CREATE TABLE `oauth_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `descriptioin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oauth_type
-- ----------------------------
INSERT INTO `oauth_type` VALUES (1, 'wechat', 'wechat');

-- ----------------------------
-- Table structure for prefer
-- ----------------------------
DROP TABLE IF EXISTS `prefer`;
CREATE TABLE `prefer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of prefer
-- ----------------------------
INSERT INTO `prefer` VALUES (1, '自动化');
INSERT INTO `prefer` VALUES (2, '通信');
INSERT INTO `prefer` VALUES (3, '互联网');
INSERT INTO `prefer` VALUES (4, '人工智能');
INSERT INTO `prefer` VALUES (5, '能源环保');
INSERT INTO `prefer` VALUES (6, '生产建造');
INSERT INTO `prefer` VALUES (7, '电气');
INSERT INTO `prefer` VALUES (8, '金融');
INSERT INTO `prefer` VALUES (9, '法律');
INSERT INTO `prefer` VALUES (10, '销售');
INSERT INTO `prefer` VALUES (11, '生化');
INSERT INTO `prefer` VALUES (12, '教育');
INSERT INTO `prefer` VALUES (13, '财会');
INSERT INTO `prefer` VALUES (14, '游戏');
INSERT INTO `prefer` VALUES (15, '网络安全');
INSERT INTO `prefer` VALUES (16, '大数据');
INSERT INTO `prefer` VALUES (17, 'UI');
INSERT INTO `prefer` VALUES (18, '硬件开发');
INSERT INTO `prefer` VALUES (19, '其他');

-- ----------------------------
-- Table structure for question_list
-- ----------------------------
DROP TABLE IF EXISTS `question_list`;
CREATE TABLE `question_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `english` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `details` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bgu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `state` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question_list
-- ----------------------------
INSERT INTO `question_list` VALUES (1, '初级生涯测试题', 'Junior Career Test Questions', '共5道题', 'cloud://baron-xiaoha-mg8fa.6261-baron-xiaoha-mg8fa-1302667767/images/activity/chuji.png', 0);
INSERT INTO `question_list` VALUES (2, '中级生涯测试题', 'Intermediate Career Test Questions', '共28道题', 'cloud://baron-xiaoha-mg8fa.6261-baron-xiaoha-mg8fa-1302667767/images/activity/zhongji.png', NULL);
INSERT INTO `question_list` VALUES (3, '高级生涯测试题', 'Advanced career test questions', '共93道题', 'cloud://baron-xiaoha-mg8fa.6261-baron-xiaoha-mg8fa-1302667767/images/activity/gaoji.png', NULL);

-- ----------------------------
-- Table structure for sms_record
-- ----------------------------
DROP TABLE IF EXISTS `sms_record`;
CREATE TABLE `sms_record`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `send_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sms_record
-- ----------------------------
INSERT INTO `sms_record` VALUES (26, '1', '1', '1', '2020-08-12 11:20:30');
INSERT INTO `sms_record` VALUES (27, '18519745462', '【小哈职友】您好，您的验证码是3130，请在5分钟之内输入', '2', '2020-08-12 11:23:34');
INSERT INTO `sms_record` VALUES (28, '17376554257', '【小哈职友】您好，您的验证码是5174，请在5分钟之内输入', '1', '2020-08-12 15:16:13');
INSERT INTO `sms_record` VALUES (29, '15671814178', '【小哈职友】您好，您的验证码是7772，请在5分钟之内输入', '2', '2020-08-12 15:22:04');
INSERT INTO `sms_record` VALUES (30, '15671814178', '【小哈职友】您好，您的验证码是5588，请在5分钟之内输入', '2', '2020-08-12 15:23:08');
INSERT INTO `sms_record` VALUES (31, '15671814178', '【小哈职友】您好，您的验证码是2985，请在5分钟之内输入', '2', '2020-08-12 15:26:51');
INSERT INTO `sms_record` VALUES (32, '13569956565', '【小哈职友】您好，您的验证码是1592，请在5分钟之内输入', '2', '2020-08-12 15:29:54');
INSERT INTO `sms_record` VALUES (33, '17376554257', '【小哈职友】您好，您的验证码是6332，请在5分钟之内输入', '1', '2020-08-12 15:38:44');
INSERT INTO `sms_record` VALUES (34, '15671814178', '【小哈职友】您好，您的验证码是9420，请在5分钟之内输入', '1', '2020-08-12 15:51:56');
INSERT INTO `sms_record` VALUES (35, '15671814178', '【小哈职友】您好，您的验证码是9030，请在5分钟之内输入', '1', '2020-08-13 10:30:07');
INSERT INTO `sms_record` VALUES (36, '15671814178', '【小哈职友】您好，您的验证码是2538，请在5分钟之内输入', '1', '2020-08-13 10:42:35');
INSERT INTO `sms_record` VALUES (37, '15671814178', '【小哈职友】您好，您的验证码是5049，请在5分钟之内输入', '1', '2020-08-13 10:54:58');
INSERT INTO `sms_record` VALUES (38, '15671814178', '【小哈职友】您好，您的验证码是5953，请在5分钟之内输入', '1', '2020-08-13 10:56:00');
INSERT INTO `sms_record` VALUES (39, '15671814178', '【小哈职友】您好，您的验证码是6404，请在5分钟之内输入', '1', '2020-08-13 13:43:18');
INSERT INTO `sms_record` VALUES (40, '15671814178', '【小哈职友】您好，您的验证码是8394，请在5分钟之内输入', '1', '2020-08-13 14:31:36');
INSERT INTO `sms_record` VALUES (41, '17376554257', '【小哈职友】您好，您的验证码是8875，请在5分钟之内输入', '2', '2020-08-14 09:44:14');
INSERT INTO `sms_record` VALUES (42, '15671814178', '【小哈职友】您好，您的验证码是6399，请在5分钟之内输入', '2', '2020-08-14 10:39:03');
INSERT INTO `sms_record` VALUES (43, '17376554257', '【小哈职友】您好，您的验证码是9381，请在5分钟之内输入', '0', '2020-08-14 13:34:56');
INSERT INTO `sms_record` VALUES (44, '17376554257', '【小哈职友】您好，您的验证码是8492，请在5分钟之内输入', '2', '2020-08-16 14:56:56');
INSERT INTO `sms_record` VALUES (45, '17376554257', '【小哈职友】您好，您的验证码是1188，请在5分钟之内输入', '2', '2020-08-16 15:05:47');
INSERT INTO `sms_record` VALUES (46, '17376554257', '【小哈职友】您好，您的验证码是7108，请在5分钟之内输入', '2', '2020-08-16 15:34:32');
INSERT INTO `sms_record` VALUES (47, '17376554257', '【小哈职友】您好，您的验证码是6526，请在5分钟之内输入', '2', '2020-08-16 15:49:16');
INSERT INTO `sms_record` VALUES (48, '17376554257', '【小哈职友】您好，您的验证码是5250，请在5分钟之内输入', '1', '2020-08-17 00:32:09');
INSERT INTO `sms_record` VALUES (49, '13453774185', '【小哈职友】您好，您的验证码是4961，请在5分钟之内输入', '2', '2020-08-17 07:55:55');
INSERT INTO `sms_record` VALUES (50, '15671814178', '【小哈职友】您好，您的验证码是2166，请在5分钟之内输入', '2', '2020-08-17 11:18:25');
INSERT INTO `sms_record` VALUES (51, '15671814178', '【小哈职友】您好，您的验证码是6487，请在5分钟之内输入', '2', '2020-08-17 15:27:37');
INSERT INTO `sms_record` VALUES (52, '15671814178', '【小哈职友】您好，您的验证码是7431，请在5分钟之内输入', '2', '2020-08-17 15:29:14');
INSERT INTO `sms_record` VALUES (53, '15857172796', '【小哈职友】您好，您的验证码是7550，请在5分钟之内输入', '2', '2020-08-17 16:02:48');

-- ----------------------------
-- Table structure for tb_score
-- ----------------------------
DROP TABLE IF EXISTS `tb_score`;
CREATE TABLE `tb_score`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `subject` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_score
-- ----------------------------
INSERT INTO `tb_score` VALUES (1, 1, '语文', 90);
INSERT INTO `tb_score` VALUES (2, 1, '数学', 92);
INSERT INTO `tb_score` VALUES (3, 1, '英语', 80);
INSERT INTO `tb_score` VALUES (4, 2, '语文', 90);
INSERT INTO `tb_score` VALUES (5, 2, '数学', 92);
INSERT INTO `tb_score` VALUES (6, 2, '英语', 80);
INSERT INTO `tb_score` VALUES (7, 3, '语文', 90);
INSERT INTO `tb_score` VALUES (8, 3, '数学', 92);
INSERT INTO `tb_score` VALUES (9, 3, '英语', 80);

-- ----------------------------
-- Table structure for tb_score1
-- ----------------------------
DROP TABLE IF EXISTS `tb_score1`;
CREATE TABLE `tb_score1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `subject` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `fuck`(`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `a`(`subject`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_score1
-- ----------------------------
INSERT INTO `tb_score1` VALUES (1, 1, '22', 20);
INSERT INTO `tb_score1` VALUES (2, NULL, '语文', NULL);
INSERT INTO `tb_score1` VALUES (3, NULL, '数学', NULL);
INSERT INTO `tb_score1` VALUES (4, NULL, '英语', NULL);
INSERT INTO `tb_score1` VALUES (5, NULL, '语文', NULL);
INSERT INTO `tb_score1` VALUES (6, NULL, '数学', NULL);
INSERT INTO `tb_score1` VALUES (7, NULL, '英语', NULL);
INSERT INTO `tb_score1` VALUES (8, NULL, '语文', NULL);
INSERT INTO `tb_score1` VALUES (9, NULL, '数学', NULL);
INSERT INTO `tb_score1` VALUES (10, NULL, '英语', NULL);
INSERT INTO `tb_score1` VALUES (17, NULL, '数学', NULL);
INSERT INTO `tb_score1` VALUES (18, NULL, '数学', NULL);
INSERT INTO `tb_score1` VALUES (19, NULL, '数学', NULL);
INSERT INTO `tb_score1` VALUES (20, NULL, '数学', 92);
INSERT INTO `tb_score1` VALUES (21, NULL, '数学', 92);
INSERT INTO `tb_score1` VALUES (22, NULL, '数学', 92);

-- ----------------------------
-- Table structure for user_follow
-- ----------------------------
DROP TABLE IF EXISTS `user_follow`;
CREATE TABLE `user_follow`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户ID',
  `follow_id` int(11) NOT NULL DEFAULT 0 COMMENT '关注用户ID',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '关注时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户关注表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_follow
-- ----------------------------
INSERT INTO `user_follow` VALUES (2, 6, 5, '2020-08-16 23:27:56');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键\n',
  `career_id` int(11) NULL DEFAULT NULL,
  `nickname` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `address` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '地址',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `introduce` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '个性签名',
  `gender` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `prefer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '喜好方向',
  `school` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学校',
  `major` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '专业',
  `occupation` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职业',
  `occupation_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职业生涯描述',
  `identity_type` tinyint(3) NULL DEFAULT 0 COMMENT '身份 1-学生 2-职友',
  `answer5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `answer28` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `answer93` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (5, 29, '小三', '浙江杭州', 'http://avatar.jpg', 'Just have a little faith!', '男', 'UI,互联网', '浙江科技学院', '大数据', '保安', '我的职业生涯是...', 1, 'ESTJ', 'ENFJ', NULL, '2020-08-16 15:49:27', '2020-08-17 16:22:26');
INSERT INTO `users` VALUES (6, 29, '小四', '北京', 'http://avatar.jpg', 'Just have a little faith!', '男', 'UI,互联网', '浙江科技学院', '大数据', '保安', '我的职业生涯是...', 1, 'ESTJ', NULL, NULL, '2020-08-16 15:49:27', '2020-08-17 11:20:42');
INSERT INTO `users` VALUES (7, NULL, '王犁犁', '山西临汾', 'http://avatar.jpg', 'Just have a little faith!', '女', NULL, '浙江科技学院', '', 'UI设计', '我的职业生涯是...', 0, NULL, NULL, NULL, '2020-08-17 07:56:22', '2020-08-17 11:20:43');
INSERT INTO `users` VALUES (14, NULL, 'df ', '', '', '个人介绍', '', 'UI,互联网', '浙江大学', '', '', '', 2, NULL, NULL, NULL, '2020-08-17 15:29:26', '2021-06-27 15:52:48');
INSERT INTO `users` VALUES (15, NULL, '', '', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLAjjfhqVx2ic32sc496c2iaaJmmfvVbKiap8eQdeYTcWWLl2XjiagKHia37rDdHmnMkOJ8WZ7koqJH5GQ/132', '个性签名', '', 'UI,互联网', '', '', NULL, NULL, 2, 'ENTJ', 'ESTJ', NULL, '2020-08-17 15:29:53', '2020-08-17 18:51:28');

SET FOREIGN_KEY_CHECKS = 1;
