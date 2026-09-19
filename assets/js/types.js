// Mô tả 16 nhóm tính cách theo giọng của Baans:
// gợi mở để tự đối chiếu, không chẩn đoán, không đánh giá năng lực.

export const AXES = [
  { key: 'EI', left: 'E', right: 'I', leftName: 'Hướng ngoại', rightName: 'Hướng nội',
    desc: 'Cách bạn nạp lại năng lượng: giữa mọi người hay trong khoảng riêng.' },
  { key: 'SN', left: 'S', right: 'N', leftName: 'Giác quan', rightName: 'Trực giác',
    desc: 'Cách bạn thu nhận thông tin: từ điều cụ thể hay từ điều gợi mở.' },
  { key: 'TF', left: 'T', right: 'F', leftName: 'Lý trí', rightName: 'Cảm xúc',
    desc: 'Cách bạn cân nhắc lựa chọn: theo tiêu chí chung hay theo điều mình coi trọng.' },
  { key: 'JP', left: 'J', right: 'P', leftName: 'Nguyên tắc', rightName: 'Linh hoạt',
    desc: 'Cách bạn sắp xếp đời sống: chốt trước một hướng hay giữ nhiều khả năng.' }
];

export const GROUPS = {
  NT: { name: 'Tư duy & khám phá', mark: '✦', desc: 'Tò mò về ý tưởng, hệ thống và những khả năng mới.' },
  NF: { name: 'Giá trị & kết nối', mark: '❋', desc: 'Quan tâm đến ý nghĩa, con người và những điều mình coi trọng.' },
  SJ: { name: 'Thực tế & tổ chức', mark: '▦', desc: 'Chú ý đến sự rõ ràng, trách nhiệm và những điều thiết thực.' },
  SP: { name: 'Trải nghiệm & linh hoạt', mark: '◒', desc: 'Khám phá qua trải nghiệm và thích ứng với điều đang diễn ra.' }
};

export const TYPES = {
  INTJ: {
    group: 'NT', name: 'Người dựng đường dài', tagline: 'Nhìn xa, rồi lặng lẽ xây từng bước.',
    intro: 'Bạn thường thấy trước hình dạng của một việc khi nó còn đang mờ, và dễ chịu khi được tự mình sắp lại các mảnh cho khớp. Bạn thích làm việc trong yên tĩnh, với một hướng đi đã được cân nhắc kỹ, hơn là giữa sự náo nhiệt.',
    strengths: ['Nhìn ra cấu trúc phía sau những việc rời rạc', 'Kiên trì với một hướng đã chọn', 'Tự đặt tiêu chuẩn cao mà không cần ai nhắc'],
    watch: ['Dễ chốt kết luận trước khi người khác kịp theo', 'Có thể bỏ qua phần cảm xúc trong một quyết định đúng'],
    tips: ['Nói ra phần suy luận, không chỉ nói kết luận', 'Hỏi người liên quan điều gì quan trọng với họ', 'Cho phép một kế hoạch được sửa giữa chừng']
  },
  INTP: {
    group: 'NT', name: 'Người gỡ rối ý tưởng', tagline: 'Một câu hỏi hay, hơn một câu trả lời vội.',
    intro: 'Bạn thích tháo một vấn đề ra xem nó vận hành thế nào, và thấy thoả mãn khi các mảnh ý tưởng cuối cùng cũng khớp. Bạn cần khoảng riêng để nghĩ, và thường chỉ lên tiếng khi đã thấy đủ rõ.',
    strengths: ['Phát hiện chỗ chưa nhất quán trong một lập luận', 'Học rất nhanh những thứ mình thực sự tò mò', 'Không ngại xét lại điều ai cũng cho là hiển nhiên'],
    watch: ['Dễ dừng ở giai đoạn tìm hiểu mà chưa bắt tay làm', 'Có thể trì hoãn quyết định để chờ thêm thông tin'],
    tips: ['Đặt một hạn để chốt, kể cả khi chưa đủ chắc', 'Chia ý tưởng thành một việc nhỏ làm được hôm nay', 'Chia sẻ bản nháp sớm thay vì chờ hoàn chỉnh']
  },
  ENTJ: {
    group: 'NT', name: 'Người mở đường', tagline: 'Biết đích, rồi dọn lối cho cả nhóm.',
    intro: 'Bạn dễ thấy đâu là bước tiếp theo và thường là người lên tiếng đầu tiên khi mọi thứ đang lửng lơ. Bạn thích mục tiêu rõ ràng, tiến độ nhìn thấy được, và những người dám nói thẳng.',
    strengths: ['Biến một ý định mơ hồ thành kế hoạch có mốc', 'Ra quyết định khi thông tin chưa đầy đủ', 'Kéo người khác cùng đi về một hướng'],
    watch: ['Nhịp của bạn có thể nhanh hơn nhịp của nhóm', 'Sự thẳng thắn đôi khi bị nghe thành phán xét'],
    tips: ['Hỏi trước khi kết luận về một tình huống', 'Chừa chỗ cho người chậm nói hơn lên tiếng', 'Ghi nhận công khai phần việc của người khác']
  },
  ENTP: {
    group: 'NT', name: 'Người thử khả năng', tagline: 'Luôn còn một cách khác chưa ai thử.',
    intro: 'Bạn thấy hứng thú khi một vấn đề còn mở, và thích lật nó qua nhiều góc cho tới khi bật ra hướng lạ. Bạn học nhanh, nói nhanh, và dễ chán khi mọi thứ đã vào khuôn.',
    strengths: ['Nghĩ ra phương án mà người khác chưa nhìn tới', 'Xoay chuyển tốt khi tình hình thay đổi', 'Tranh luận để làm rõ chứ không để thắng'],
    watch: ['Nhiều việc mở cùng lúc, ít việc đóng lại', 'Dễ bỏ dở khi phần thú vị đã qua'],
    tips: ['Chọn một ý tưởng và đưa nó tới bản dùng được', 'Ghi lại các ý chưa làm để quay lại sau', 'Nhờ ai đó giữ giúp phần hoàn thiện']
  },
  INFJ: {
    group: 'NF', name: 'Người nhìn thấu', tagline: 'Hiểu điều chưa ai nói thành lời.',
    intro: 'Bạn thường cảm được điều đang diễn ra bên dưới một cuộc trò chuyện, và bị cuốn theo những việc có ý nghĩa với mình. Bạn cần khoảng lặng để sắp lại suy nghĩ trước khi bước tiếp.',
    strengths: ['Nhận ra nhu cầu chưa được nói ra', 'Bền bỉ với điều mình tin là đúng', 'Kết nối những mảnh rời thành một bức tranh chung'],
    watch: ['Dễ ôm cảm xúc của người khác vào mình', 'Có thể kỳ vọng quá lý tưởng vào một việc'],
    tips: ['Nói rõ giới hạn của mình sớm, không chờ tới lúc đã mệt', 'Chấp nhận một bản chưa hoàn hảo nhưng đã xong', 'Dành một khoảng trong tuần chỉ để nghỉ']
  },
  INFP: {
    group: 'NF', name: 'Người giữ điều mình tin', tagline: 'Làm vì thấy đúng, không vì phải làm.',
    intro: 'Bạn chọn theo điều mình coi trọng hơn là theo điều tiện lợi, và có một đời sống bên trong khá phong phú. Bạn cởi mở với người khác, nhưng cần thời gian mới thực sự mở lòng.',
    strengths: ['Nhạy với điều quan trọng với từng người', 'Sáng tạo khi được làm theo cách riêng', 'Trung thành với giá trị của mình'],
    watch: ['So sánh thực tế với hình dung lý tưởng rồi thấy hụt', 'Ngại nói ra khi điều gì đó không ổn'],
    tips: ['Đặt một bước nhỏ, cụ thể cho điều bạn quan tâm', 'Nói sớm khi thấy khó chịu, đừng để dồn', 'Tách "việc chưa xong" khỏi "mình chưa đủ tốt"']
  },
  ENFJ: {
    group: 'NF', name: 'Người nâng người khác lên', tagline: 'Thấy tiềm năng trước khi người đó thấy.',
    intro: 'Bạn dễ đọc được không khí của một nhóm và thường là người kéo mọi người lại gần nhau. Bạn thấy vui khi ai đó tiến lên nhờ một cú hích đúng lúc.',
    strengths: ['Tạo cảm giác an toàn để người khác lên tiếng', 'Gắn kết những người rất khác nhau', 'Truyền được lý do phía sau một việc'],
    watch: ['Lo cho người khác trước, cho mình sau cùng', 'Khó chịu khi không khí nhóm căng thẳng'],
    tips: ['Hỏi mình muốn gì trước khi hỏi nhóm cần gì', 'Để người khác tự giải quyết phần của họ', 'Cho phép một mâu thuẫn tồn tại mà không cần dàn xếp ngay']
  },
  ENFP: {
    group: 'NF', name: 'Người thắp hứng', tagline: 'Mỗi người gặp là một cánh cửa mới.',
    intro: 'Bạn nhiệt với những khả năng vừa mở ra và dễ làm người khác thấy hào hứng theo. Bạn thích tự do chọn việc theo cảm hứng hơn là đi theo một lịch cố định.',
    strengths: ['Bắt chuyện và kết nối rất tự nhiên', 'Nhìn thấy điểm sáng ở người khác', 'Thích nghi nhanh khi kế hoạch đổi'],
    watch: ['Nhiều việc bắt đầu, ít việc đi tới cuối', 'Dễ mất đà khi phần mới mẻ đã hết'],
    tips: ['Chọn ba việc cho tuần này, tạm bỏ phần còn lại', 'Rủ một người cùng làm để giữ nhịp', 'Ghi nhận cả những việc nhỏ đã hoàn tất']
  },
  ISTJ: {
    group: 'SJ', name: 'Người giữ nền', tagline: 'Đã nhận thì làm tới nơi.',
    intro: 'Bạn thích những thứ rõ ràng: biết việc gì, làm thế nào, xong lúc nào. Người khác thường yên tâm khi giao việc cho bạn, vì bạn hiếm khi để rơi.',
    strengths: ['Làm đúng và đủ, kể cả phần không ai kiểm', 'Nhớ chi tiết và giữ được nếp', 'Bình tĩnh khi việc dồn'],
    watch: ['Khó chịu khi quy trình bị đổi giữa chừng', 'Có thể bỏ qua cách mới vì cách cũ vẫn chạy'],
    tips: ['Thử một cách khác trong phạm vi nhỏ, ít rủi ro', 'Hỏi lý do phía sau một thay đổi trước khi từ chối', 'Nói ra khi khối lượng việc đã quá tải']
  },
  ISFJ: {
    group: 'SJ', name: 'Người chăm phần thầm lặng', tagline: 'Để ý những điều ít ai để ý.',
    intro: 'Bạn nhớ những chi tiết nhỏ về người xung quanh và thường lặng lẽ làm cho mọi thứ dễ thở hơn. Bạn thích một môi trường ổn định, có thể đoán trước.',
    strengths: ['Quan tâm cụ thể, không chỉ nói suông', 'Giữ lời và giữ nếp cho cả nhóm', 'Kiên nhẫn với việc lặp lại'],
    watch: ['Nhận thêm việc dù đã đầy', 'Ngại đề nghị điều mình cần'],
    tips: ['Tập nói "để mình xem lại đã" trước khi nhận', 'Ghi lại phần việc mình đã làm để người khác thấy', 'Đề nghị giúp đỡ khi cần, không chờ được hỏi']
  },
  ESTJ: {
    group: 'SJ', name: 'Người sắp việc', tagline: 'Rõ ràng thì mọi người đỡ mệt.',
    intro: 'Bạn thấy khó chịu khi mọi thứ lơ lửng và thường là người đứng ra chia việc, chốt mốc. Bạn tin vào tiêu chuẩn chung và làm đúng theo cam kết.',
    strengths: ['Đưa một nhóm rối ren vào trật tự', 'Nói rõ kỳ vọng ngay từ đầu', 'Theo sát tới khi việc xong'],
    watch: ['Có thể quyết thay người khác cho nhanh', 'Ít kiên nhẫn với cách làm chưa được chứng minh'],
    tips: ['Hỏi ý trước khi phân việc', 'Để chỗ cho một cách làm khác được thử', 'Tách "chưa đúng ý mình" khỏi "làm sai"']
  },
  ESFJ: {
    group: 'SJ', name: 'Người giữ nhịp chung', tagline: 'Mọi người ổn thì mình mới ổn.',
    intro: 'Bạn để ý tới không khí chung và thường là người nhớ sinh nhật, nhớ ai đang gặp khó. Bạn thích những mối quan hệ rõ ràng, ấm áp và có qua có lại.',
    strengths: ['Tạo cảm giác thuộc về cho người mới', 'Tổ chức những việc chung rất chu đáo', 'Nhận ra sớm khi ai đó đang không ổn'],
    watch: ['Dễ bị ảnh hưởng bởi đánh giá của người khác', 'Ngại xung đột nên hay nhận phần thiệt'],
    tips: ['Phân biệt "họ không hài lòng" với "mình sai"', 'Nói ra nhu cầu của mình bằng một câu thẳng', 'Để một việc chung cho người khác đứng ra lo']
  },
  ISTP: {
    group: 'SP', name: 'Người gỡ bằng tay', tagline: 'Làm thử là biết ngay.',
    intro: 'Bạn học bằng cách bắt tay vào, và thường bình tĩnh một cách lạ khi có sự cố. Bạn không thích họp dài, chỉ thích thấy vấn đề được xử lý xong.',
    strengths: ['Xử lý sự cố nhanh và thực tế', 'Giữ được sự tỉnh táo khi mọi người đang rối', 'Tự học kỹ năng mới rất nhanh'],
    watch: ['Ít chia sẻ nên người khác khó đoán bạn nghĩ gì', 'Dễ chán khi việc trở thành thủ tục'],
    tips: ['Cập nhật ngắn cho nhóm biết bạn đang ở đâu', 'Ghi lại cách bạn đã xử lý để người sau dùng được', 'Cam kết một mốc dài hơn thói quen của mình']
  },
  ISFP: {
    group: 'SP', name: 'Người sống theo cảm nhận', tagline: 'Đẹp hay không, mình cảm được.',
    intro: 'Bạn chú ý tới cảm giác của một khoảnh khắc và thường thể hiện mình qua việc làm hơn là lời nói. Bạn cần không gian riêng và không thích bị thúc.',
    strengths: ['Nhạy với thẩm mỹ và những chi tiết tinh tế', 'Hiện diện thật lòng với người mình quý', 'Linh hoạt, ít áp đặt lên người khác'],
    watch: ['Tránh va chạm nên hay giữ trong lòng', 'Khó theo một kế hoạch dài và cứng'],
    tips: ['Nói ra điều mình muốn trước khi thấy bực', 'Đặt mốc ngắn thay vì kế hoạch nhiều tháng', 'Cho mình quyền từ chối mà không cần giải thích dài']
  },
  ESTP: {
    group: 'SP', name: 'Người ra tay ngay', tagline: 'Xử lý trước, bàn sau.',
    intro: 'Bạn đọc tình huống nhanh và thích những việc có kết quả thấy được ngay. Bạn thoải mái với rủi ro hơn phần lớn mọi người và ít khi bị đông cứng.',
    strengths: ['Quyết nhanh khi tình huống gấp', 'Thuyết phục trực tiếp, không vòng vo', 'Xoay chuyển giỏi khi kế hoạch vỡ'],
    watch: ['Bỏ qua bước chuẩn bị vì thấy chậm', 'Dễ mất kiên nhẫn với việc lặp lại'],
    tips: ['Dành hai phút hỏi "nếu hỏng thì sao" trước khi lao vào', 'Giao phần theo dõi dài hạn cho người hợp hơn', 'Nghe hết trước khi đưa phương án']
  },
  ESFP: {
    group: 'SP', name: 'Người làm ngày vui lên', tagline: 'Có mặt hết mình ở đây, lúc này.',
    intro: 'Bạn mang năng lượng vào một không gian và dễ làm người khác thấy thoải mái. Bạn thích trải nghiệm thật hơn là bàn luận, và phản ứng rất nhạy với không khí xung quanh.',
    strengths: ['Kéo mọi người ra khỏi sự gượng gạo', 'Nhận ra ngay khi ai đó cần được để ý', 'Thích ứng tự nhiên với tình huống mới'],
    watch: ['Kế hoạch dài dễ bị đẩy lùi', 'Nhạy với lời chê hơn mình tưởng'],
    tips: ['Ghi việc quan trọng ra ngoài đầu, vào lịch', 'Chọn một mục tiêu dài và chia thành từng tuần', 'Hỏi lại ý người góp ý trước khi thấy tổn thương']
  }
};
