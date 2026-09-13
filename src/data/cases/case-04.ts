import type { CaseFile } from "../case-types";

export const case04: CaseFile = {
  id: "case-04",
  number: "04",
  codename: "KHÁCH TRỌ PHÒNG 4B",
  title: "Khách trọ phòng 4B",
  slot: { cabinet: "left", drawer: 3 },
  state: "playable",
  brief: [
    {
      kicker: "BÁO CÁO HIỆN TRƯỜNG / HỒ SƠ WB–1954",
      title: "Nhà trọ trên phố Deacon",
      html: `<p class="paper-lead">Bà chủ nhà trọ gõ cửa gọi ăn sáng, không ai đáp. Khi mở cửa, khí gas đã tràn kín phòng.</p>
        <p>Walter Brix, 34 tuổi, nhà báo tự do, thuê phòng 4B đã ba tuần. Van khí ở lò sưởi cũ bị vặn hết cỡ — không phải kiểu chỉnh tình cờ trong lúc ngủ.</p>
        <p>Trên bàn là một cuốn sổ tay đầy chữ viết tắt, gạch xóa, và những cái tên không ai trong nhà trọ từng nghe.</p>
        <div class="assessment"><span>NGƯỜI PHÁT HIỆN</span><p>Ida Lang, bà chủ nhà trọ.</p></div>`,
    },
    {
      kicker: "KHÁM NGHIỆM SƠ BỘ",
      title: "Một vị khách không tên",
      html: `<p>Sổ khách trọ cho thấy có người mượn chìa khóa phòng 4B ngoài Brix, tối hôm trước khi anh chết — ký một cái tên không ai nhận ra.</p>
        <p>Một người đàn ông lạ mặt, tự giới thiệu là "đại diện bảo hiểm", đã ghé qua phòng anh đúng tối đó.</p>
        <div class="margin-note">Ghi chú của thám tử</div>
        <p>Brix đang viết về một thứ lớn hơn một bài báo địa phương. Câu cuối trong sổ tay của anh: "tiền chảy qua ba sòng bạc, cùng một người ký."</p>`,
    },
  ],
  coverPortraitId: "c4-victim",
  suspects: [
    {
      id: "s4-lang",
      name: "Ida Lang",
      role: "Bà chủ nhà trọ · 58 tuổi",
      alibi: "Khai đang dọn dẹp tầng dưới suốt buổi tối.",
      note: "Biết Brix đang trốn nợ tiền phòng hai tuần liền.",
      portraitId: "c4-lang",
    },
    {
      id: "s4-price",
      name: "Sam Price",
      role: "Khách trọ phòng bên cạnh, con bạc · 40 tuổi",
      alibi: "Khai say rượu ở quán gần đó, một người làm chứng mơ hồ.",
      note: "Nợ Brix một khoản tiền nhỏ, vay để đánh bạc.",
      portraitId: "c4-price",
    },
    {
      id: "s4-hollis",
      name: "Warren Hollis",
      role: "Biên tập viên tòa báo · 52 tuổi",
      alibi: "Khai đang ở tòa soạn làm việc muộn, có người trực đêm xác nhận.",
      note: "Lo sợ bài viết sắp tới của Brix sẽ liên lụy tới chính tòa báo.",
      portraitId: "c4-hollis",
    },
    {
      id: "s4-vance",
      name: "Curt Vance",
      role: "Tự giới thiệu là \"đại diện bảo hiểm\" · tuổi không rõ",
      alibi: "Khai mơ hồ, không rõ tung tích trước và sau khi ghé phòng Brix.",
      note: "Không ai trong khu phố từng gặp trước đó.",
      portraitId: "c4-vance",
    },
  ],
  evidence: [
    {
      id: "ev4-gas",
      name: "Van khí lò sưởi",
      kicker: "TANG VẬT 01",
      detail: "Bị vặn hết cỡ — không phải kiểu chỉnh tình cờ trong lúc ngủ.",
      source: "file",
    },
    {
      id: "ev4-notes",
      name: "Sổ tay của Brix",
      kicker: "TANG VẬT 02",
      detail: "Có tên viết tắt \"C.W.\" lặp lại nhiều lần, cùng dòng: \"tiền chảy qua ba sòng bạc, cùng một người ký.\"",
      source: "file",
    },
    {
      id: "ev4-key4b",
      name: "Sổ khách trọ",
      kicker: "TANG VẬT 03",
      detail: "Ghi có người mượn chìa khóa phòng 4B ngoài Brix, tối hôm trước — ký tên \"Vance.\"",
      source: "file",
    },
    {
      id: "ev4-insurance",
      name: "Danh thiếp \"đại diện bảo hiểm\"",
      kicker: "TANG VẬT 04",
      detail: "Của Vance — công ty ghi trên thiệp không tồn tại trong danh bạ thương mại.",
      source: "file",
    },
    {
      id: "ev4-debt",
      name: "Giấy nợ giữa Price và Brix",
      kicker: "TANG VẬT 05",
      detail: "Số tiền nhỏ, khó là động cơ giết người.",
      source: "file",
    },
    {
      id: "ev4-photo2",
      name: "Một cuộn phim chưa tráng",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Giấu trong hộp — ảnh chụp ba người đàn ông bắt tay trước cửa một sòng bạc.",
      source: "room",
      roomProp: "crumpled-note",
      shape: "roll",
    },
    {
      id: "ev4-ticketstub",
      name: "Vé xe lửa một chiều",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Mua cho Brix, đứng tên khác, ngày đi trùng hôm sau khi anh ta chết — có lẽ định dọa anh rời thành phố, trước khi kế hoạch đổi giữa đường.",
      source: "room",
      roomProp: "floor-key",
      shape: "paper",
    },
  ],
  testimonies: [
    { suspectId: "s4-lang", text: "Cậu ta nợ tiền phòng tôi hai tuần, nhưng tôi đâu có giết khách trọ vì tiền phòng. Tôi lau sàn dưới nhà tới tận mười giờ, ai cũng thấy." },
    { suspectId: "s4-price", text: "Tôi nợ cậu ta chút tiền cờ bạc, chuyện nhỏ. Tối đó tôi ở quán rượu góc phố, tôi không nhớ rõ mấy giờ về, thề tôi say quá." },
    { suspectId: "s4-hollis", text: "Cậu ta cứ đòi đăng bài, tôi bảo cần thêm chứng cứ. Tôi lo cho tòa báo, không lo cho riêng mình. Tôi ở văn phòng tới khuya, ông hỏi người trực đêm." },
    { suspectId: "s4-vance", text: "Tôi chỉ ghé hỏi cậu ta về một hợp đồng bảo hiểm cũ, chuyện công việc bình thường. Tôi không nhớ rõ mình đã ở đâu sau đó, thành phố này tôi không quen đường." },
  ],
  links: [
    {
      a: "ev4-key4b",
      b: "ev4-insurance",
      insight: "Vance mượn chìa khóa dưới một danh tính không có thật — hắn đã có mặt trong phòng trước khi Brix chết.",
    },
    {
      a: "ev4-gas",
      b: "ev4-key4b",
      insight: "Van khí bị vặn, và người duy nhất mượn thêm chìa khóa phòng chính là Vance.",
    },
    {
      a: "ev4-notes",
      b: "ev4-photo2",
      insight: "Ghi chú \"C.W.\" của Brix khớp với cuộn phim chụp ba người đàn ông trước một sòng bạc — Brix đang lần theo đúng mạng lưới đứng sau ký tắt đó.",
    },
    {
      a: "ev4-ticketstub",
      b: "ev4-insurance",
      insight: "Kế hoạch ban đầu có thể chỉ là dọa Brix rời thành phố bằng một chuyến tàu — nhưng khi anh không chịu rời đi, kế hoạch đổi thành thủ tiêu.",
    },
  ],
  methods: [
    { id: "m4-gas", label: "Vặn van khí lò sưởi trong lúc nạn nhân ngủ", detail: "Khớp với tình trạng van khí và không có thương tích ngoài trên thi thể." },
    { id: "m4-stairs", label: "Đẩy ngã cầu thang", detail: "Không khớp: không có chấn thương phù hợp với một cú ngã." },
    { id: "m4-sleep", label: "Bỏ thuốc ngủ quá liều", detail: "Không khớp: không tìm thấy thuốc ngủ trong người nạn nhân." },
  ],
  motives: [
    { id: "mo4-expose", label: "Ngăn Brix công bố bài điều tra mạng lưới rửa tiền qua sòng bạc", detail: "Bài viết sắp hoàn thành đe dọa trực tiếp tới mạng lưới đứng sau \"C.W.\"" },
    { id: "mo4-debt2", label: "Xóa nợ cờ bạc", detail: "Khoản nợ giữa Price và Brix quá nhỏ để là động cơ giết người." },
    { id: "mo4-grudge", label: "Trả đũa vì bài báo cũ bôi xấu tòa soạn", detail: "Không có bài báo nào như vậy trong hồ sơ." },
  ],
  solution: { suspectId: "s4-vance", methodId: "m4-gas", motiveId: "mo4-expose" },
  requiredEvidence: ["ev4-gas", "ev4-notes", "ev4-key4b", "ev4-photo2", "ev4-ticketstub"],
  fragment: "WB–1954–06",
};
