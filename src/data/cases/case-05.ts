import type { CaseFile } from "@/data/case-types";

export const case05: CaseFile = {
  id: "case-05",
  number: "05",
  codename: "CHUYẾN TÀU KHÔNG NGƯỜI LÁI",
  title: "Chuyến tàu không người lái",
  slot: { cabinet: "right", drawer: 0 },
  state: "playable",
  brief: [
    {
      kicker: "BÁO CÁO HIỆN TRƯỜNG / HỒ SƠ OK–1954",
      title: "Con tàu tự trôi vào depot",
      html: `<p class="paper-lead">Không ai kéo còi báo hiệu. Con tàu hàng cứ thế trôi vào ga cuối, chậm dần, rồi dừng lại.</p>
        <p>Otis Kray, 46 tuổi, người lái tàu, được tìm thấy đã chết trong buồng lái. Cần điều khiển tốc độ ở vị trí <strong>mở hết</strong>, không phải vị trí dừng khẩn cấp.</p>
        <p>Bản kê khai hàng hóa chính thức của chuyến tàu ghi thiếu một khoang — khoang số 3.</p>
        <div class="assessment"><span>NGƯỜI PHÁT HIỆN</span><p>Nhân viên depot, khi tàu không giảm tốc đúng giờ.</p></div>`,
    },
    {
      kicker: "KHÁM NGHIỆM SƠ BỘ",
      title: "Mảnh giấy trong tay nạn nhân",
      html: `<p>Một mảnh giấy nhòe nước nắm chặt trong tay Kray: "...không được mở khoang 3 dù có chuyện gì."</p>
        <p>Biên bản đổi lộ trình do nhân viên điều vận Alma Corwin ký tay có giờ ký sớm hơn giờ tàu thực sự đổi hướng tới bốn mươi phút.</p>
        <div class="margin-note">Ghi chú của thám tử</div>
        <p>Một hành khách đi lậu bị bắt giữ trên tàu. Một thanh tra đường sắt xuất hiện đúng đêm đó. Và một người phụ lái đã nhảy tàu ở trạm giữa đường vì "không khỏe."</p>`,
    },
  ],
  coverPortraitId: "c5-victim",
  suspects: [
    {
      id: "s5-tate",
      name: "Dutch Tate",
      role: "Phụ lái (fireman) · 33 tuổi",
      alibi: "Khai nhảy tàu ở một trạm giữa đường vì cảm thấy không khỏe.",
      note: "Không ai xác nhận được anh ta rời tàu đúng lúc nào.",
      portraitId: "c5-tate",
    },
    {
      id: "s5-corwin",
      name: "Alma Corwin",
      role: "Nhân viên điều vận ga · 45 tuổi",
      alibi: "Khai đang trực trong phòng điều vận suốt ca.",
      note: "Người duy nhất đổi lộ trình tàu vào phút cuối, né qua một điểm không có trạm kiểm soát.",
      portraitId: "c5-corwin",
    },
    {
      id: "s5-pratt",
      name: "Skinny Pratt",
      role: "Hành khách đi lậu, bị bắt giữ trên tàu · 22 tuổi",
      alibi: "Khai chỉ đi lậu vé, trốn trong toa hàng, không biết gì về khoang 3.",
      note: "Bị phát hiện và giữ lại ngay khi tàu vào depot.",
      portraitId: "c5-pratt",
    },
    {
      id: "s5-sikes",
      name: "Roy Sikes",
      role: "Tự giới thiệu là thanh tra đường sắt · tuổi không rõ",
      alibi: "Khai lên tàu để kiểm tra hàng hóa theo quy định định kỳ.",
      note: "Xuất hiện đúng đêm chuyến tàu chở khoang hàng đặc biệt.",
      portraitId: "c5-sikes",
    },
  ],
  evidence: [
    {
      id: "ev5-manifest",
      name: "Bản kê khai hàng hóa",
      kicker: "TANG VẬT 01",
      detail: "Bản chính thức khác với thực tế trong toa — chênh lệch đúng một khoang chưa rõ nội dung.",
      source: "file",
    },
    {
      id: "ev5-throttle",
      name: "Cần điều khiển tốc độ",
      kicker: "TANG VẬT 02",
      detail: "Ở vị trí mở hết, không phải vị trí dừng khẩn cấp — ai đó đẩy tàu chạy nhanh rồi rời khỏi buồng lái.",
      source: "file",
    },
    {
      id: "ev5-note2",
      name: "Mảnh giấy nhòe nước",
      kicker: "TANG VẬT 03",
      detail: "Trong tay nạn nhân: \"...không được mở khoang 3 dù có chuyện gì.\"",
      source: "file",
    },
    {
      id: "ev5-badge",
      name: "Thẻ thanh tra của Sikes",
      kicker: "TANG VẬT 04",
      detail: "Số hiệu không khớp danh sách thanh tra chính thức của tuyến đường sắt.",
      source: "file",
    },
    {
      id: "ev5-switch",
      name: "Biên bản đổi lộ trình",
      kicker: "TANG VẬT 05",
      detail: "Do Corwin ký tay — giờ ký sớm hơn giờ tàu thực sự đổi hướng tới bốn mươi phút.",
      source: "file",
    },
    {
      id: "ev5-crowbar",
      name: "Một thanh cạy sắt",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Có vết cạy mới, dính bụi gỗ khớp với vật liệu đóng khoang tàu.",
      source: "room",
      roomProp: "evidence-box",
      shape: "bar",
    },
    {
      id: "ev5-ledgerpage2",
      name: "Một trang sổ sách rời",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Ghi các con số luân chuyển tiền giữa \"khoang 3\" và ba địa điểm khác nhau — góc trang có chữ ký tắt \"C.W.\"",
      source: "room",
      roomProp: "under-desk",
      shape: "paper",
    },
  ],
  testimonies: [
    { suspectId: "s5-tate", text: "Tôi thấy chóng mặt, buồn nôn, tôi phải xuống. Tôi không nhớ chính xác trạm nào, đầu tôi lúc đó không tỉnh táo lắm." },
    { suspectId: "s5-corwin", text: "Tôi đổi lộ trình vì có báo cản đường trên tuyến chính, chuyện bình thường. Giờ ký trên biên bản chắc tôi ghi nhầm, đêm đó bận lắm." },
    { suspectId: "s5-pratt", text: "Tôi trốn trong toa hàng phía sau, không biết khoang 3 ở đâu, không biết ông Kray là ai cho tới khi bị bắt. Tôi chỉ muốn về nhà, không có tiền mua vé." },
    { suspectId: "s5-sikes", text: "Tôi lên tàu kiểm tra hàng hóa theo quy định, chuyện tôi làm cả chục năm nay. Ông Kray không cho tôi vào khoang 3, chúng tôi có to tiếng một chút, rồi tôi xuống tàu ở trạm kế tiếp." },
  ],
  links: [
    {
      a: "ev5-badge",
      b: "ev5-manifest",
      insight: "Sikes không phải thanh tra thật — hắn lên tàu để lục khoang 3, đúng khoang có chênh lệch kê khai.",
    },
    {
      a: "ev5-throttle",
      b: "ev5-note2",
      insight: "Nạn nhân cố giữ khoang 3, đẩy tốc độ tàu lên để không ai kịp lên kiểm tra giữa đường — rồi bị giết ngay trong lúc giằng co ở buồng lái.",
    },
    {
      a: "ev5-crowbar",
      b: "ev5-ledgerpage2",
      insight: "Thanh cạy sắt dùng để mở khoang 3, nơi giấu trang sổ sách mang chữ ký \"C.W.\" — hàng hóa thật là tiền và sổ sách của một mạng lưới, không phải hàng hóa khai báo.",
    },
    {
      a: "ev5-switch",
      b: "ev5-badge",
      insight: "Corwin đổi lộ trình sớm hơn giờ thật, né tàu qua một điểm không có trạm kiểm soát — đúng lúc \"thanh tra\" giả bước lên tàu.",
    },
  ],
  methods: [
    { id: "m5-push", label: "Đẩy ra khỏi buồng lái đang chạy tốc độ cao", detail: "Khớp với cần điều khiển ở vị trí mở hết và không có dấu vết siết cổ hay đầu độc." },
    { id: "m5-strangle2", label: "Siết cổ trong buồng lái rồi dựng hiện trường", detail: "Không khớp: pháp y không ghi nhận vết siết ở cổ." },
    { id: "m5-poison3", label: "Đầu độc trong bình nước uống của thợ lái", detail: "Không khớp: không có dấu độc trong người nạn nhân." },
  ],
  motives: [
    { id: "mo5-cover", label: "Ngăn tố cáo việc mở khoang hàng chứa sổ sách bí mật", detail: "Kray giữ đúng khoang chứa bằng chứng của một mạng lưới rửa tiền." },
    { id: "mo5-robbery", label: "Cướp tài sản trong khoang hàng", detail: "Không khớp: không có tài sản nào bị lấy khỏi khoang 3, chỉ có sổ sách bị lục." },
    { id: "mo5-personal", label: "Trả thù cá nhân với thợ lái", detail: "Không có mối quan hệ cá nhân nào giữa Sikes và Kray trong hồ sơ." },
  ],
  solution: { suspectId: "s5-sikes", methodId: "m5-push", motiveId: "mo5-cover" },
  requiredEvidence: ["ev5-badge", "ev5-throttle", "ev5-note2", "ev5-crowbar", "ev5-ledgerpage2"],
  fragment: "OK–1954–08",
};
