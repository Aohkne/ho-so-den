import type { CaseFile } from "../case-types";

export const case06: CaseFile = {
  id: "case-06",
  number: "06",
  codename: "BỨC ẢNH CHỤP LÚC RẠNG SÁNG",
  title: "Bức ảnh chụp lúc rạng sáng",
  slot: { cabinet: "right", drawer: 1 },
  state: "playable",
  brief: [
    {
      kicker: "BÁO CÁO HIỆN TRƯỜNG / HỒ SƠ RC–1954",
      title: "Trong phòng tối",
      html: `<p class="paper-lead">Người hàng xóm nghe tiếng cãi vã lúc gần sáng, rồi im bặt. Đến trưa, không ai thấy cửa phòng tối mở ra.</p>
        <p>Ruth Calloway, 30 tuổi, nhiếp ảnh gia đường phố, chuyên chụp cảnh thành phố lúc rạng sáng để bán cho báo, được tìm thấy chết ngay trong phòng tối riêng.</p>
        <p>Bình hóa chất rửa ảnh bị đổ, mùi hắc bất thường — pháp y xác nhận không phải chất rửa ảnh thông thường.</p>
        <div class="assessment"><span>NGƯỜI PHÁT HIỆN</span><p>Mildred Shaw, người hàng xóm phòng bên cạnh.</p></div>`,
    },
    {
      kicker: "KHÁM NGHIỆM SƠ BỘ",
      title: "Một khung hình bị cắt rời",
      html: `<p>Tấm phim lưu (contact sheet) của Ruth thiếu đúng một khung hình — bị cắt rời khỏi cuộn, gọn gàng, có chủ đích.</p>
        <p>Trong ví của cô là một khoản tiền mặt lớn bất thường, nhiều hơn giá bán một cuộn phim thông thường rất nhiều.</p>
        <div class="margin-note">Ghi chú của thám tử</div>
        <p>Một người mua ảnh cho tòa báo. Một người hàng xóm nghe hết mọi tiếng động. Một chú bé giao báo phụ rửa ảnh mỗi sáng. Và một "nhà sưu tầm ảnh" không ai biết địa chỉ.</p>`,
    },
  ],
  coverPortraitId: "c6-victim",
  suspects: [
    {
      id: "s6-krantz",
      name: "Oliver Krantz",
      role: "Biên tập ảnh, Nhật Báo Thị Trấn · 50 tuổi",
      alibi: "Khai đang ở tòa soạn suốt đêm, chuẩn bị số báo sáng.",
      note: "Mua ảnh của Ruth thường xuyên, trả giá thấp hơn giá trị thật.",
      portraitId: "c6-krantz",
    },
    {
      id: "s6-shaw",
      name: "Mildred Shaw",
      role: "Người hàng xóm phòng bên cạnh · 62 tuổi",
      alibi: "Khai chỉ nghe tiếng cãi vã, không rời phòng mình.",
      note: "Là người báo tin, tự nhận không liên quan gì tới sự việc.",
      portraitId: "c6-shaw",
    },
    {
      id: "s6-lowe",
      name: "Victor Lowe",
      role: "Tự giới thiệu là \"nhà sưu tầm ảnh\" · tuổi không rõ",
      alibi: "Không rõ tung tích, biến mất khỏi khu phố sau đêm đó.",
      note: "Đến mua toàn bộ cuộn phim đêm đó, trả một khoản tiền lớn bất thường.",
      portraitId: "c6-lowe",
    },
    {
      id: "s6-boy",
      name: "Timmy Osei",
      role: "Chú bé giao báo, phụ Ruth rửa ảnh · 15 tuổi",
      alibi: "Khai đi giao báo từ 5 giờ sáng, nhiều người trên phố xác nhận.",
      note: "Là người quen thân nhất với thói quen làm việc của Ruth.",
      portraitId: "c6-boy",
    },
  ],
  evidence: [
    {
      id: "ev6-contact",
      name: "Tấm phim lưu (contact sheet)",
      kicker: "TANG VẬT 01",
      detail: "Thiếu đúng một khung hình đã bị cắt rời khỏi cuộn.",
      source: "file",
    },
    {
      id: "ev6-chemical",
      name: "Bình hóa chất rửa ảnh bị đổ",
      kicker: "TANG VẬT 02",
      detail: "Mùi hắc bất thường — pháp y xác nhận không phải chất rửa ảnh thông thường.",
      source: "file",
    },
    {
      id: "ev6-card",
      name: "Danh thiếp \"nhà sưu tầm ảnh\"",
      kicker: "TANG VẬT 03",
      detail: "Của Victor Lowe — không địa chỉ, không số điện thoại.",
      source: "file",
    },
    {
      id: "ev6-cash",
      name: "Một khoản tiền mặt lớn",
      kicker: "TANG VẬT 04",
      detail: "Trong ví của Ruth, nhiều hơn giá bán một cuộn phim thông thường.",
      source: "file",
    },
    {
      id: "ev6-argument",
      name: "Lời khai về tiếng cãi vã",
      kicker: "TANG VẬT 05",
      detail: "Của Mildred Shaw, nghe được lúc gần sáng, một câu rõ nhất: \"...đưa cuộn phim lại đây.\"",
      source: "file",
    },
    {
      id: "ev6-negative",
      name: "Khung phim bị cắt rời",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Giấu trong hộp — chụp cảnh hai người đàn ông trao một chiếc cặp da trước nhà kho bến tàu lúc rạng sáng.",
      source: "room",
      roomProp: "evidence-box",
      shape: "photo",
    },
    {
      id: "ev6-face",
      name: "Một chiếc kính lúp",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Dùng để soi khung hình, còn dính một dấu vân tay lạ không khớp bất kỳ ai đã lấy lời khai.",
      source: "room",
      roomProp: "under-desk",
      shape: "loop",
    },
  ],
  testimonies: [
    { suspectId: "s6-krantz", text: "Ảnh của Ruth luôn tốt, tôi trả đúng giá thị trường, không hơn không kém. Tôi ở tòa soạn tới sáng, cả kíp trực đêm thấy tôi." },
    { suspectId: "s6-shaw", text: "Tôi nghe tiếng cãi cọ qua tường, một câu gì đó về cuộn phim. Tôi không dám gõ cửa, đến khi im hẳn tôi mới ngủ được." },
    { suspectId: "s6-lowe", text: "Tôi thích sưu tầm ảnh đường phố cũ, chuyện đó có gì lạ. Tôi trả giá cao vì tôi thích cuộn phim đó, đơn giản vậy thôi." },
    { suspectId: "s6-boy", text: "Cô Ruth dạy tôi rửa ảnh, cô tốt với tôi lắm. Sáng đó tôi đi giao báo từ sớm, chưa kịp qua phòng tối, tới lúc nghe tin thì cô đã..." },
  ],
  links: [
    {
      a: "ev6-contact",
      b: "ev6-negative",
      insight: "Khung hình bị cắt khỏi tấm phim lưu chính là bức ảnh tìm được trong hộp — chụp một cuộc trao đổi bí mật ở bến tàu.",
    },
    {
      a: "ev6-card",
      b: "ev6-cash",
      insight: "Victor Lowe trả một khoản tiền lớn bất thường — không phải để \"sưu tầm\", mà để mua lại một bằng chứng.",
    },
    {
      a: "ev6-chemical",
      b: "ev6-argument",
      insight: "Câu cãi vã \"đưa cuộn phim lại đây\" cùng chất hóa học lạ trong phòng tối — cuộc trao đổi đã hóa dữ dội ngay trong chính căn phòng đó.",
    },
    {
      a: "ev6-negative",
      b: "ev6-face",
      insight: "Bức ảnh liên quan trực tiếp tới dấu vân tay lạ trên kính lúp — một người thứ ba đã từng cầm khung phim này, không phải Ruth.",
    },
  ],
  methods: [
    { id: "m6-chem", label: "Đầu độc bằng hóa chất phòng tối, dựng thành tai nạn", detail: "Khớp với bình hóa chất lạ bị đổ và không có chấn thương ngoài trên thi thể." },
    { id: "m6-blunt", label: "Đánh bằng vật cứng trong lúc giằng co", detail: "Không khớp: không có chấn thương ngoài nào được ghi nhận." },
    { id: "m6-starve", label: "Khóa cửa phòng tối, bỏ đói", detail: "Không khớp: thời điểm tử vong quá sớm so với khả năng này." },
  ],
  motives: [
    { id: "mo6-photo", label: "Thu hồi bức ảnh chụp cuộc trao đổi bí mật ở bến tàu", detail: "Bức ảnh vô tình ghi lại điều không ai muốn bị thấy." },
    { id: "mo6-robbery2", label: "Cướp khoản tiền mặt trong ví", detail: "Không khớp: khoản tiền vẫn còn nguyên trong ví khi tìm thấy thi thể." },
    { id: "mo6-revenge2", label: "Trả thù vì ảnh chụp xấu trên báo", detail: "Không có bài báo nào như vậy liên quan tới các nghi phạm." },
  ],
  solution: { suspectId: "s6-lowe", methodId: "m6-chem", motiveId: "mo6-photo" },
  requiredEvidence: ["ev6-contact", "ev6-chemical", "ev6-card", "ev6-negative", "ev6-face"],
  fragment: "RC–1954–09",
};
