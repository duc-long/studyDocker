/**
 * Docker Master Course Curriculum & Labs Data - Fully Expanded 12-Level DevOps Syllabus
 */
const DOCKER_COURSE_DATA = [
  {
    level: 0,
    title: "Cài đặt & Cấu hình Docker",
    description: "Hướng dẫn cài đặt Docker Desktop, kích hoạt WSL 2 và thiết lập tài khoản Docker Hub từ con số 0",
    topics: [
      {
        id: "l0-installation",
        title: "0.1 Hướng dẫn cài đặt Docker Desktop & WSL 2",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>Hướng dẫn thiết lập môi trường Docker từ con số 0</h2>
          
          <h3>1. Kích hoạt WSL 2 (Windows Subsystem for Linux 2)</h3>
          <p>Để Docker chạy mượt mà và có hiệu năng cao nhất trên Windows, Microsoft đã phát triển nhân Linux tích hợp sâu. Hãy chuẩn bị môi trường theo các bước sau:</p>
          <ol>
            <li>Mở <strong>PowerShell</strong> với quyền Administrator và chạy lệnh: <code style="color:var(--accent-blue);">wsl --install</code></li>
            <li>Khởi động lại máy tính của bạn khi được yêu cầu để hoàn tất kích hoạt.</li>
          </ol>

          <h3>2. Cài đặt Docker Desktop</h3>
          <ol>
            <li>Tải file cài đặt chính thức dành cho Windows từ trang chủ: <a href="https://www.docker.com/products/docker-desktop/" target="_blank" style="color:var(--accent-blue); text-decoration:underline;">Docker Desktop Download</a>.</li>
            <li>Chạy file installer vừa tải về, hãy chắc chắn đã chọn tick vào tùy chọn <strong>"Use WSL 2 instead of Hyper-V"</strong> để đạt được hiệu năng tối ưu nhất.</li>
            <li>Nhấn <strong>Ok</strong> và đợi quá trình giải nén, thiết lập hoàn tất, sau đó khởi động lại máy tính.</li>
          </ol>

          <h3>3. Xác minh cài đặt thành công</h3>
          <p>Mở Terminal (cmd hoặc powershell) trên máy tính của bạn và nhập câu lệnh:</p>
          <pre style="background:#1e1e2f; color:#a5b4fc; padding:1rem; border-radius:6px; font-family:var(--font-mono); font-size:0.85rem;"><code>docker --version</code></pre>
          <p>Nếu màn hình hiển thị chính xác phiên bản như <code>Docker version 24.x.x</code> hoặc mới hơn, xin chúc mừng! Bạn đã cài đặt Docker thành công.</p>
        `,
        quiz: [
          {
            question: "Khi cài đặt Docker Desktop trên Windows, công nghệ ảo hóa nào được khuyến nghị giúp tối ưu hóa hiệu năng và khởi động nhanh nhất?",
            options: [
              "VirtualBox",
              "Hyper-V",
              "WSL 2 (Windows Subsystem for Linux 2)",
              "VMware"
            ],
            correct: 2,
            explanation: "WSL 2 chạy trực tiếp nhân Linux tích hợp trong Windows, mang lại hiệu năng vượt trội và tương thích tối đa với Docker so với các máy ảo Hyper-V/VirtualBox thế hệ cũ."
          }
        ]
      },
      {
        id: "l0-hub-registry",
        title: "0.2 Đăng ký Docker Hub & Đăng nhập CLI",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>Đăng ký tài khoản Docker Hub & Cấu hình Docker CLI</h2>
          
          <h3>1. Đăng ký tài khoản Docker Hub</h3>
          <p><strong>Docker Hub</strong> là thư viện Registry lớn nhất thế giới chứa hàng triệu container image có sẵn. Bạn cần đăng ký tài khoản để tải lên (Push) các sản phẩm của mình:</p>
          <ul>
            <li>Truy cập <a href="https://hub.docker.com" target="_blank" style="color:var(--accent-blue); text-decoration:underline;">hub.docker.com</a>.</li>
            <li>Đăng ký một tài khoản miễn phí với Email, Username và Password của bạn.</li>
          </ul>

          <h3>2. Liên kết tài khoản vào Docker Desktop</h3>
          <p>Mở ứng dụng <strong>Docker Desktop</strong> trên máy, nhấn nút <strong>Sign In</strong> ở góc trên bên phải và đăng nhập bằng tài khoản vừa tạo để đồng bộ.</p>

          <h3>3. Đăng nhập qua Command Line (CLI)</h3>
          <p>Để build và push image lên Docker Hub từ terminal, bạn cần thực hiện đăng nhập:</p>
          <pre style="background:#1e1e2f; color:#a5b4fc; padding:1rem; border-radius:6px; font-family:var(--font-mono); font-size:0.85rem;"><code>docker login</code></pre>
          <p>Nhập <strong>Username</strong> và <strong>Password/Access Token</strong> của bạn. Khi xuất hiện dòng chữ <code>Login Succeeded</code> nghĩa là bạn đã sẵn sàng chia sẻ các Docker Image của mình ra toàn cầu!</p>
        `,
        quiz: [
          {
            question: "Lệnh nào sau đây dùng để xác thực và liên kết tài khoản Docker Hub của bạn thông qua cửa sổ dòng lệnh CLI?",
            options: [
              "docker registry connect",
              "docker login",
              "docker auth",
              "docker hub signin"
            ],
            correct: 1,
            explanation: "Lệnh 'docker login' dùng để đăng nhập vào Docker Registry mặc định (Docker Hub) hoặc private registry."
          }
        ]
      }
    ]
  },
  {
    level: 1,
    title: "Docker Foundation",
    description: "Nền tảng ảo hóa, Container và Kiến trúc Docker Engine",
    topics: [
      {
        id: "l1-what-is-docker",
        title: "1.1 Docker là gì & Vấn đề giải quyết",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>1. Docker là gì?</h2>
          <p><strong>Docker</strong> là một nền tảng mã nguồn mở cho phép các nhà phát triển đóng gói, vận chuyển và chạy ứng dụng bên trong các môi trường cô lập được gọi là <strong>Containers</strong>.</p>
          <div class="info-box">
            <p><strong>Triết lý cốt lõi:</strong> "Build once, run anywhere" (Xây dựng một lần, chạy ở mọi nơi).</p>
          </div>
          <h2>2. Vấn đề Docker giải quyết</h2>
          <p>Trước khi có Docker, bài toán kinh điển là xung đột môi trường: "Code chạy ngon lành ở máy Dev nhưng lỗi khi deploy lên Server Prod". Docker giải quyết triệt để bằng cách đóng gói mã nguồn, thư viện, cấu hình hệ thống thành một Image tĩnh đồng nhất.</p>
        `,
        quiz: [
          {
            question: "Vấn đề cốt lõi nhất mà Docker giải quyết là gì?",
            options: [
              "Giúp ứng dụng không bao giờ gặp lỗi runtime.",
              "Đảm bảo ứng dụng chạy đồng nhất giữa môi trường phát triển (Dev) và môi trường thực tế (Prod).",
              "Thay thế hoàn toàn mã nguồn của dự án.",
              "Làm cho máy tính cá nhân chạy nhanh hơn."
            ],
            correct: 1,
            explanation: "Docker đóng gói ứng dụng cùng toàn bộ môi trường chạy của nó, loại bỏ hoàn toàn sự sai khác về cấu hình/runtime."
          }
        ]
      },
      {
        id: "l1-vm-vs-container",
        title: "1.2 So sánh VM và Docker Container",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>So sánh Máy ảo (VM) và Container</h2>
          <p><strong>Máy ảo (VM):</strong> Chạy trên một Hypervisor, mỗi VM chứa một Guest OS đầy đủ (nặng vài GB, khởi động lâu, tốn nhiều RAM).</p>
          <p><strong>Container:</strong> Chạy trực tiếp trên Host OS thông qua Docker Engine, chia sẻ chung Kernel hệ điều hành (dung lượng siêu nhẹ, khởi động mili-giây, hiệu năng gần như native).</p>
        `,
        quiz: [
          {
            question: "Container nhẹ hơn VM vì lý do nào?",
            options: [
              "Không cần sử dụng bộ nhớ RAM.",
              "Chia sẻ chung Kernel của Host OS và không cần cài đặt một Guest OS hoàn chỉnh.",
              "Sử dụng công nghệ nén tệp tin đặc biệt.",
              "Chạy trực tiếp trên đám mây."
            ],
            correct: 1,
            explanation: "Container loại bỏ lớp Guest OS nặng nề, chia sẻ chung nhân hệ điều hành của máy host."
          }
        ]
      },
      {
        id: "l1-architecture",
        title: "1.3 Kiến trúc Client - Daemon & Docker Hub",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>Kiến trúc Docker & Cơ chế phân lớp</h2>
          <p>Docker sử dụng kiến trúc <strong>Client-Server</strong>:</p>
          <ul>
            <li><strong>Docker Client:</strong> Giao diện dòng lệnh (CLI) để gửi yêu cầu.</li>
            <li><strong>Docker Daemon (Daemon Service):</strong> Chạy ngầm trên host để quản lý Images, Containers, Networks, Volumes.</li>
            <li><strong>Docker Registry (Docker Hub):</strong> Kho chứa lưu trữ các Docker Image toàn cầu.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Thành phần nào trực tiếp quản lý và vận hành Container ảo?",
            options: [
              "Docker Client",
              "Docker Daemon",
              "Docker Hub",
              "Trình duyệt web"
            ],
            correct: 1,
            explanation: "Docker Daemon là service chạy ngầm trực tiếp lắng nghe các API call và khởi chạy container."
          }
        ]
      },
      {
        id: "l1-deepdive-engine",
        title: "1.4 Docker Engine Deep Dive: OCI, Containerd & Runtime",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Cơ cấu nội bộ của Docker Engine</h2>
          <p>Ít ai biết Docker không trực tiếp chạy Container. Nó là một tập hợp các công cụ kiến trúc phân tầng:</p>
          <ul>
            <li><strong>Docker CLI (Client):</strong> Dùng API gởi lệnh xuống daemon.</li>
            <li><strong>dockerd (Daemon):</strong> Quản lý các tài nguyên cấp cao như images, volumes, networks.</li>
            <li><strong>containerd:</strong> Bộ quản lý vòng đời container (Supervisor), thực hiện tải image, quản lý network.</li>
            <li><strong>runc (OCI Runtime):</strong> Bộ chạy container thực tế ở tầng nhân Linux (Low-level Runtime), tương tác trực tiếp với Namespaces và Cgroups để dựng container cô lập.</li>
            <li><strong>OCI (Open Container Initiative):</strong> Chuẩn chung thế giới quy định định dạng ảnh và runtime để tránh độc quyền.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Thành phần trực tiếp tương tác nhân Linux để khởi tạo container (Low-level Runtime) là?",
            options: [
              "dockerd",
              "containerd",
              "runc (OCI Runtime)",
              "Docker Hub"
            ],
            correct: 2,
            explanation: "runc là OCI low-level runtime thực thi cấu hình namespace/cgroup để cô lập container từ nhân hệ điều hành."
          }
        ]
      },
      {
        id: "l1-lifecycle",
        title: "1.5 Docker Container Lifecycle",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>Vòng đời hoạt động của một Container</h2>
          <p>Hiểu rõ các trạng thái giúp lập trình viên quản trị tài nguyên chính xác:</p>
          <div class="visual-schema" style="background:#1e1e2f; padding: 1.5rem; border-radius: 8px; font-family: monospace; text-align: center; color: #a5b4fc;">
            [ Docker Image ] ──( docker run / create )──> <strong>[ Created ]</strong> <br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; │ (start)<br>
            [ Stopped (Exited) ] <──( docker stop )─── <strong>[ Running ]</strong> <br>
            &nbsp; &nbsp; &nbsp; &nbsp; │<br>
            &nbsp; ( docker rm )<br>
            &nbsp; &nbsp; &nbsp; &nbsp; ⬇<br>
            [ Xóa Khỏi Đĩa Cứng ]
          </div>
          <p><strong>Lưu ý:</strong> Dừng container (Stop) chỉ giải phóng RAM/CPU. Dữ liệu trên file system ảo của container vẫn giữ nguyên cho đến khi xóa container (Remove - rm).</p>
        `,
        quiz: [
          {
            question: "Khi gõ lệnh 'docker stop', điều gì xảy ra với dữ liệu ghi trong container?",
            options: [
              "Dữ liệu bị xóa sạch ngay lập tức.",
              "Dữ liệu vẫn được giữ lại trên ổ đĩa và chỉ bị xóa khi chạy lệnh 'docker rm'.",
              "Dữ liệu được tự động đẩy lên Docker Hub.",
              "Dữ liệu được nén lại thành image mới."
            ],
            correct: 1,
            explanation: "Stop chỉ giải phóng tài nguyên CPU/RAM, tệp tin ghi tạm trong container chỉ biến mất khi container bị xóa hoàn toàn khỏi đĩa (docker rm)."
          }
        ]
      },
      {
        id: "l1-container-vs-process",
        title: "1.6 Container vs Process: Sự thật cho người mới",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>Sự thật cốt lõi: Container chính là một Process!</h2>
          <p><strong>Sai lầm kinh điển:</strong> Xem container như một máy ảo Linux đầy đủ chạy ngầm.</p>
          <p><strong>Sự thật:</strong> Container thực chất chỉ là một **Tiến trình thông thường (Process)** chạy trên máy host, nhưng được bao bọc cách ly bằng 2 công nghệ của Linux Kernel:</p>
          <ul>
            <li><strong>Namespaces:</strong> Cô lập góc nhìn (Khiến process tưởng mình có RAM riêng, Network riêng, ổ cứng riêng, Root User riêng).</li>
            <li><strong>Control Groups (Cgroups):</strong> Giới hạn tài nguyên (Chỉ cho phép process dùng tối đa 1 CPU, 512MB RAM...).</li>
          </ul>
        `,
        quiz: [
          {
            question: "Hai công nghệ Linux nào trực tiếp cấu thành cơ chế cô lập của Container?",
            options: [
              "Java Virtual Machine & Apache",
              "Namespaces (cách ly góc nhìn) & Control Groups (giới hạn tài nguyên)",
              "Hyper-V & VMware",
              "Git & GitHub"
            ],
            correct: 1,
            explanation: "Namespaces cô lập tài nguyên mạng, tiến trình, ổ đĩa còn Cgroups khống chế lượng CPU/RAM được phép dùng."
          }
        ]
      }
    ]
  },
  {
    level: 2,
    title: "Docker Command",
    description: "Học lệnh CLI + Thực hành tương tác giả lập với 17 lệnh cốt lõi",
    topics: [
      {
        id: "l2-version-info",
        title: "2.1 docker version & info",
        badge: "Practice",
        difficulty: "Beginner",
        content: `
          <h2>1. docker version</h2>
          <p><strong>Khái niệm:</strong> Kiểm tra phiên bản của Client và Daemon đang chạy.</p>
          <p><strong>Cú pháp:</strong> <code>docker version</code></p>
          <h2>2. docker info</h2>
          <p><strong>Khái niệm:</strong> Xem cấu hình tài nguyên hệ thống hiện tại của Docker Engine (RAM, CPU, Số container...).</p>
          <p><strong>Lỗi thường gặp:</strong> <i>"Cannot connect to the Docker daemon"</i> ➜ Docker Engine chưa bật.</p>
        `,
        practice: {
          type: "terminal",
          instructions: "Gõ lệnh 'docker version' để kiểm tra kết nối phiên bản.",
          expectedState: { command: "docker version" },
          hints: [
            "Gõ lệnh `docker version` vào terminal bên phải và nhấn Enter.",
            "Hãy đảm bảo gõ đúng chính tả, không có ký tự lạ."
          ],
          solutions: "docker version"
        },
        quiz: [
          {
            question: "Lệnh nào hiển thị số lượng container đang chạy và tài nguyên hệ thống của Docker?",
            options: ["docker version", "docker info", "docker status", "docker ps"],
            correct: 1,
            explanation: "docker info hiển thị chi tiết thông số hệ thống của Docker Host."
          }
        ]
      },
      {
        id: "l2-pull-images",
        title: "2.2 docker pull & images",
        badge: "Practice",
        difficulty: "Beginner",
        content: `
          <h2>1. docker pull</h2>
          <p><strong>Khái niệm:</strong> Tải một Image từ Registry (Docker Hub) về máy host.</p>
          <p><strong>Cú pháp:</strong> <code>docker pull [image_name]:[tag]</code></p>
          <h2>2. docker images</h2>
          <p><strong>Khái niệm:</strong> Liệt kê tất cả các Image đang lưu trữ local trên máy host.</p>
          <p><strong>Lỗi thường gặp:</strong> <i>"Error response from daemon: manifest not found"</i> ➜ Điền sai tên Image hoặc Tag.</p>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy tải Image 'nginx' bằng lệnh docker pull.",
          expectedState: { command: "docker pull nginx" },
          hints: [
            "Sử dụng câu lệnh: `docker pull [tên_image]`.",
            "Trong bài tập này, tên image cần tải là `nginx`."
          ],
          solutions: "docker pull nginx"
        },
        quiz: [
          {
            question: "Lệnh nào dùng để liệt kê tất cả các Docker Image đang lưu trữ trên máy host?",
            options: ["docker ps", "docker images", "docker list", "docker inspect"],
            correct: 1,
            explanation: "docker images hiển thị danh sách tất cả local images kèm tag và dung lượng."
          }
        ]
      },
      {
        id: "l2-run-ps",
        title: "2.3 docker run & ps",
        badge: "Practice",
        difficulty: "Beginner",
        content: `
          <h2>1. docker run</h2>
          <p><strong>Khái niệm:</strong> Khởi tạo và chạy một Container từ Image.</p>
          <p><strong>Cú pháp:</strong> <code>docker run [options] image_name [command]</code></p>
          <ul>
            <li><code>-d</code>: Chạy ngầm (detached mode).</li>
            <li><code>-p host_port:container_port</code>: Ánh xạ cổng mạng.</li>
            <li><code>--name [tên]</code>: Đặt tên gợi nhớ cho container.</li>
          </ul>
          <h2>2. docker ps</h2>
          <p><strong>Khái niệm:</strong> Liệt kê danh sách các Container đang chạy (thêm <code>-a</code> để hiển thị cả container đã tắt).</p>
        `,
        practice: {
          type: "terminal",
          instructions: "Khởi chạy container 'my-web' từ image nginx, chạy ngầm, map port 8080 máy host vào port 80 của container.",
          expectedState: { command: "docker run -d -p 8080:80 --name my-web nginx" },
          hints: [
            "Sử dụng flag `-d` để chạy ngầm.",
            "Cấu hình map cổng bằng `-p 8080:80`.",
            "Đặt tên container bằng `--name my-web`.",
            "Sử dụng image là `nginx`."
          ],
          solutions: "docker run -d -p 8080:80 --name my-web nginx"
        },
        quiz: [
          {
            question: "Tham số nào dùng để ánh xạ cổng từ máy host vào container?",
            options: ["-d", "-v", "-p", "--name"],
            correct: 2,
            explanation: "-p (port mapping) được dùng để kết nối cổng mạng giữa máy host and container."
          }
        ]
      },
      {
        id: "l2-exec-logs-inspect",
        title: "2.4 docker exec, logs & inspect",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>1. docker exec</h2>
          <p><strong>Khái niệm:</strong> Thực thi một câu lệnh bên trong container đang chạy. Thường dùng để truy cập bash shell.</p>
          <p><strong>Cú pháp:</strong> <code>docker exec -it [container_name] bash</code></p>
          <h2>2. docker logs</h2>
          <p><strong>Khái niệm:</strong> Xem console output stdout/stderr của container (thêm <code>-f</code> để follow realtime).</p>
          <h2>3. docker inspect</h2>
          <p><strong>Khái niệm:</strong> Lấy thông tin cấu hình JSON cực kỳ chi tiết của container (IP Address, Mount volumes...).</p>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy xem logs của container 'my-web' bằng CLI.",
          expectedState: { command: "docker logs my-web" },
          hints: [
            "Sử dụng lệnh: `docker logs [tên_container]`.",
            "Tên container cần xem log là `my-web`."
          ],
          solutions: "docker logs my-web"
        },
        quiz: [
          {
            question: "Làm cách nào để truy cập trực tiếp vào bash shell bên trong container có tên 'my-web'?",
            options: [
              "docker exec -it my-web bash",
              "docker run -it my-web bash",
              "docker connect my-web",
              "docker ssh my-web"
            ],
            correct: 0,
            explanation: "docker exec -it cho phép mở một shell tương tác trực tiếp với container đang hoạt động."
          }
        ]
      },
      {
        id: "l2-lifecycle-cmds",
        title: "2.5 docker stop, start, restart, rm & rmi",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Quản lý trạng thái Container & Image</h2>
          <ul>
            <li><code>docker stop [name]</code>: Dừng container đang chạy bằng tín hiệu SIGTERM.</li>
            <li><code>docker start [name]</code>: Bật lại container đã bị stop.</li>
            <li><code>docker restart [name]</code>: Khởi động lại container.</li>
            <li><code>docker rm [name]</code>: Xóa bỏ container (phải stop trước khi xóa, hoặc dùng flag <code>-f</code>).</li>
            <li><code>docker rmi [id]</code>: Xóa bỏ image lưu ở host.</li>
          </ul>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy dừng container 'my-web' bằng câu lệnh docker stop.",
          expectedState: { command: "docker stop my-web" },
          hints: [
            "Sử dụng lệnh: `docker stop [tên_container]`.",
            "Tên container cần dừng là `my-web`."
          ],
          solutions: "docker stop my-web"
        },
        quiz: [
          {
            question: "Bạn muốn xóa một image có ID 'a82f1b'. Lệnh nào là chuẩn xác?",
            options: ["docker rm a82f1b", "docker rmi a82f1b", "docker delete a82f1b", "docker stop a82f1b"],
            correct: 1,
            explanation: "docker rmi (remove image) dùng để xóa các image lưu local trên máy host."
          }
        ]
      },
      {
        id: "l2-cp-volume-network",
        title: "2.6 docker cp, volume & network",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Các lệnh tiện ích bổ sung</h2>
          <ul>
            <li><code>docker cp [source] [dest]</code>: Sao chép tệp giữa máy host và container.</li>
            <li><code>docker volume create [name]</code>: Khởi tạo phân vùng lưu trữ dữ liệu vĩnh viễn (persistent).</li>
            <li><code>docker network create [name]</code>: Tạo mạng nội bộ để các container liên kết.</li>
          </ul>
        `,
        practice: {
          type: "terminal",
          instructions: "Tạo một volume mới tên là 'db-data' để lưu dữ liệu database.",
          expectedState: { command: "docker volume create db-data" },
          hints: [
            "Sử dụng CLI quản lý volume: `docker volume`.",
            "Sử dụng sub-command `create` và đặt tên là `db-data`."
          ],
          solutions: "docker volume create db-data"
        },
        quiz: [
          {
            question: "Để sao chép file 'app.jar' từ máy host vào thư mục '/app' của container 'my-app', ta dùng lệnh gì?",
            options: [
              "docker push app.jar my-app:/app",
              "docker cp app.jar my-app:/app",
              "docker copy app.jar my-app:/app",
              "docker upload app.jar my-app:/app"
            ],
            correct: 1,
            explanation: "docker cp là lệnh chuẩn để truyền tệp hai chiều giữa host OS và container filesystem."
          }
        ]
      },
      {
        id: "l2-resources",
        title: "2.7 Resource Management: stats, top & Giới hạn CPU/RAM",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Giới hạn tài nguyên Container tránh nghẽn hệ thống</h2>
          <p>Mặc định, container không bị giới hạn CPU/RAM và có thể ăn hết tài nguyên của Host OS (gây sập VPS).</p>
          <h3>Lệnh khống chế tài nguyên khi run:</h3>
          <pre><code>docker run -d --name heavy-app --memory="512m" --cpus="1.5" nginx</code></pre>
          <h3>Công cụ theo dõi hệ thống:</h3>
          <ul>
            <li><code>docker stats</code>: Hiển thị bảng điều khiển tài nguyên tiêu hao thời gian thực (realtime) của tất cả containers.</li>
            <li><code>docker top [container]</code>: Xem danh sách các tiến trình (processes) đang chạy bên trong container.</li>
            <li><code>docker update</code>: Cập nhật cấu hình giới hạn tài nguyên trực tiếp cho container đang chạy mà không cần khởi động lại.</li>
          </ul>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy gõ lệnh docker stats để theo dõi mức tiêu hao tài nguyên CPU/RAM.",
          expectedState: { command: "docker stats" },
          hints: [
            "Gõ lệnh `docker stats` và nhấn Enter để xem bảng giám sát thời gian thực."
          ],
          solutions: "docker stats"
        },
        quiz: [
          {
            question: "Để giới hạn container dùng tối đa 1GB RAM, ta truyền tham số nào vào lệnh docker run?",
            options: [
              "--memory=\"1g\"",
              "--cpu=\"1\"",
              "--max-ram=\"1gb\"",
              "-p 1024:1024"
            ],
            correct: 0,
            explanation: "--memory hoặc -m quy định mức RAM trần được phép sử dụng của container."
          }
        ]
      },
      {
        id: "l2-debug",
        title: "2.8 Debug Container: attach, inspect & events",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Các lệnh hỗ trợ khắc phục sự cố (Troubleshooting)</h2>
          <ul>
            <li><code>docker attach [container]</code>: Kết nối trực tiếp luồng Input/Output của Terminal vào container đang chạy ngầm (để xem stdout trực tiếp).</li>
            <li><code>docker events</code>: Lắng nghe và in ra toàn bộ sự kiện hệ thống của Docker Daemon theo thời gian thực (Stop, Start, Die, Prune...).</li>
            <li><code>docker inspect [container]</code>: Trích xuất thông tin chi tiết dạng JSON (IP mạng, cấu hình biến, phân vùng ổ đĩa).</li>
          </ul>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy dùng docker inspect để điều tra thông tin chi tiết của container 'my-postgres'.",
          expectedState: { command: "docker inspect my-postgres" },
          hints: [
            "Cú pháp: `docker inspect [tên_container]`.",
            "Tên container cần điều tra là `my-postgres`."
          ],
          solutions: "docker inspect my-postgres"
        },
        quiz: [
          {
            question: "Để xem toàn bộ sự kiện phát ra của Docker Engine (như sự kiện container bị kill/stop), ta dùng lệnh gì?",
            options: [
              "docker events",
              "docker history",
              "docker status",
              "docker logs"
            ],
            correct: 0,
            explanation: "docker events hiển thị luồng sự kiện realtime được sinh ra bởi Docker daemon."
          }
        ]
      },
      {
        id: "l2-cleanup",
        title: "2.9 Dọn dẹp bộ nhớ: System, Volume & Image Prune",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Dọn dẹp ổ đĩa rác giải phóng tài nguyên Host</h2>
          <p>Sau một thời gian sử dụng, các container bị dừng, các volume mồ côi (dangling) và các image không dùng tới sẽ chiếm dụng hàng chục GB ổ cứng.</p>
          <ul>
            <li><code>docker system prune</code>: Dọn sạch mọi container đã stop, network không dùng, và các cache build không liên kết.</li>
            <li><code>docker image prune</code>: Xóa bỏ các image mồ côi (dangling images - hay có tên &lt;none&gt;).</li>
            <li><code>docker volume prune</code>: Xóa bỏ tất cả các volume không còn gắn kết với container nào (Cẩn thận tránh mất DB!).</li>
          </ul>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy dọn sạch hệ thống rác bằng lệnh docker system prune.",
          expectedState: { command: "docker system prune" },
          hints: [
            "Sử dụng câu lệnh: `docker system prune` và nhấn Enter."
          ],
          solutions: "docker system prune"
        },
        quiz: [
          {
            question: "Lệnh docker system prune mặc định sẽ xóa bỏ thành phần nào?",
            options: [
              "Xóa toàn bộ code dự án.",
              "Xóa các container đang chạy.",
              "Xóa các container bị dừng (stopped), network không sử dụng, image mồ côi và cache build dư thừa.",
              "Xóa cơ sở dữ liệu đang hoạt động."
            ],
            correct: 2,
            explanation: "Lệnh prune dọn sạch các tài nguyên 'chết' hoặc không còn liên kết để giải phóng đĩa cứng một cách an toàn."
          }
        ]
      }
    ]
  },
  {
    level: 3,
    title: "Docker Image & Hub Flow",
    description: "Cơ chế UnionFS và Quy trình Build - Push - Pull trên Docker Hub",
    topics: [
      {
        id: "l3-layers-cache",
        title: "3.1 Cơ chế Image Layers & Cache",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Kiến trúc Docker Image Layers & UnionFS</h2>
          <p>Docker Image được cấu thành từ các lớp tệp tin Read-only chồng lên nhau (Union File System).</p>
          <div class="info-box">
            <p>Mỗi câu lệnh trong Dockerfile (như <code>RUN</code>, <code>COPY</code>) tạo ra một Layer tĩnh mới.</p>
          </div>
          <h2>Cơ chế Cache thông minh:</h2>
          <p>Docker tự động cache các layer không đổi. Nếu layer trước thay đổi, toàn bộ layer phía sau buộc phải build lại. Do đó, quy tắc sắp xếp Dockerfile là: <strong>Cài đặt dependencies trước, COPY source code sau!</strong></p>
        `,
        quiz: [
          {
            question: "Nguyên tắc tận dụng Docker Cache tốt nhất khi viết Dockerfile là gì?",
            options: [
              "Đặt lệnh COPY source code lên trên cùng.",
              "Gộp tất cả các lệnh vào duy nhất một dòng.",
              "Đặt các thành phần ít thay đổi (Dependencies) ở trên, các thành phần hay đổi (Source code) ở dưới cùng.",
              "Không dùng base image có sẵn."
            ],
            correct: 2,
            explanation: "Giúp giữ lại cache cho các bước tải thư viện cồng kềnh, giảm thời gian build từ vài phút xuống vài giây."
          }
        ]
      },
      {
        id: "l3-dockerhub-flow",
        title: "3.2 Quy trình Build - Push - Pull trên Docker Hub",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Quy trình phân phối Docker Image chuẩn DevOps</h2>
          <p>Để lưu trữ và phân phối Image lên các Server chạy Production, ta sử dụng Registry (mặc định là <strong>Docker Hub</strong>).</p>
          
          <div class="visual-schema" style="background:#1e1e2f; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; font-family: monospace; text-align: left; color: #a5b4fc; line-height: 1.5;">
            [ Máy Developer ] ➜ <strong>docker build</strong> ➜ [ Local Image ] <br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ➜ <strong>docker push</strong>  ➜ <strong>[ Docker Hub ]</strong> <br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⬇<br>
            [ Server VPS ] &nbsp; &nbsp; ➜ <strong>docker pull</strong>  ➜ [ Khởi chạy container ]
          </div>

          <h3>1. Khái niệm & Cú pháp Build</h3>
          <pre><code>docker build -t [username_dockerhub]/[tên_image]:[tag] .</code></pre>
          <p><strong>Giải thích từng thành phần:</strong></p>
          <ul>
            <li><code>-t</code> (Tag): Định danh cho Image bằng tên và phiên bản (ví dụ: <code>nguyenvan/my-react:v1.0</code>). Nếu không ghi <code>:tag</code>, mặc định sẽ là <code>:latest</code>.</li>
            <li><code>.</code> (Dấu chấm ở cuối): <strong>Build Context</strong>. Chỉ thị cho Docker Engine biết thư mục làm việc hiện tại chứa mã nguồn và tệp Dockerfile cần đóng gói. Quên dấu chấm sẽ gây lỗi cú pháp!</li>
          </ul>

          <h3>2. Đẩy Image lên Docker Hub (Push)</h3>
          <p>Đầu tiên, bạn cần xác thực tài khoản Docker Hub trên Terminal của máy host:</p>
          <pre><code>docker login -u [username]</code></pre>
          <p>Sau đó, đẩy Image lên kho chứa Public/Private:</p>
          <pre><code>docker push [username_dockerhub]/[tên_image]:[tag]</code></pre>

          <h3>3. Kéo về sử dụng ở Server khác (Pull & Run)</h3>
          <p>Trên Server Production (VPS), bạn chỉ cần gõ lệnh kéo Image sạch về mà không cần chứa mã nguồn:</p>
          <pre><code>docker pull [username_dockerhub]/[tên_image]:[tag]</code></pre>
          <p>Và khởi chạy container chỉ trong 1 giây:</p>
          <pre><code>docker run -d -p 80:3000 [username_dockerhub]/[tên_image]:[tag]</code></pre>
        `,
        quiz: [
          {
            question: "Ký hiệu dấu chấm '.' ở cuối lệnh 'docker build -t app:v1 .' mang ý nghĩa gì?",
            options: [
              "Để kết thúc câu lệnh SQL.",
              "Build Context - Chỉ định thư mục hiện tại chứa Dockerfile và tài nguyên đóng gói.",
              "Bắt buộc theo chuẩn hệ điều hành Windows.",
              "Để chạy container ngay lập tức."
            ],
            correct: 1,
            explanation: "Dấu chấm chỉ định Build Context, giúp Docker daemon định vị Dockerfile và các tệp tin để gửi lên bộ build engine."
          }
        ]
      },
      {
        id: "l3-react-image",
        title: "3.3 Thực hành: Đóng gói ứng dụng ReactJS",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Thực hành: Đóng gói ứng dụng ReactJS Frontend</h2>
          <p>Hãy tự tay hoàn thiện file Dockerfile bên tab VSCode IDE theo yêu cầu để đóng gói ứng dụng React chạy trên cổng 3000.</p>
        `,
        practice: {
          type: "editor",
          instructions: "Hãy điền các chỉ thị Dockerfile cho ReactJS chạy cổng 3000 ở tab VSCode IDE.",
          editorFiles: [
            {
              name: "Dockerfile",
              content: "# 📝 THỰC HÀNH: Đóng gói ứng dụng ReactJS Frontend\n# Hãy tự tay viết các dòng lệnh Dockerfile chuẩn dưới đây:\n# 1. Khai báo base image: node:18-alpine\n# 2. Định nghĩa thư mục làm việc bên trong container: /app\n# 3. Sao chép package*.json vào thư mục hiện tại\n# 4. Chạy lệnh: npm install để cài thư viện\n# 5. Sao chép toàn bộ source code (tất cả các tệp) từ máy host vào container\n# 6. Khai báo container sẽ lắng nghe ở cổng: 3000\n# 7. Định nghĩa lệnh khởi chạy mặc định ứng dụng React: npm start\n\n"
            },
            {
              name: "package.json",
              content: "{\n  \"name\": \"react-docker\",\n  \"dependencies\": {\n    \"react\": \"^18.2.0\"\n  }\n}"
            }
          ],
          expectedState: {
            file: "Dockerfile",
            contains: ["FROM node:18-alpine", "WORKDIR /app", "COPY package*.json ./", "RUN npm install", "COPY . .", "EXPOSE 3000", "CMD"]
          },
          hints: [
            "Bắt đầu bằng `FROM node:18-alpine`",
            "Thiết lập thư mục hoạt động `WORKDIR /app`",
            "Sử dụng `COPY package*.json ./` để copy package config.",
            "Cài đặt dependencies bằng `RUN npm install`",
            "Sao chép mọi tệp tin bằng `COPY . .`",
            "Mở cổng React: `EXPOSE 3000`",
            "Dùng `CMD [\"npm\", \"start\"]` để khởi chạy server phát triển."
          ],
          solutions: "FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]"
        },
        quiz: [
          {
            question: "Dòng lệnh EXPOSE 3000 có tác dụng gì trong Dockerfile?",
            options: [
              "Mở cổng trực tiếp ra ngoài Internet của máy host.",
              "Tuyên bố với Docker Engine cổng mạng nội bộ mà container sẽ lắng nghe khi chạy.",
              "Bắt buộc Docker phải map cổng 3000:3000.",
              "Tải cổng 3000 về máy host."
            ],
            correct: 1,
            explanation: "EXPOSE chỉ là một tài liệu khai báo cổng nội bộ, cần kết hợp flag -p khi chạy để map cổng ra ngoài host."
          }
        ]
      },
      {
        id: "l3-image-optimization",
        title: "3.4 Tối ưu hóa Image: Giảm dung lượng từ 2GB xuống 200MB",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Nghệ thuật giảm dung lượng Docker Image</h2>
          <p>Một image quá nặng (2GB+) sẽ gây tốn tài nguyên lưu trữ trên VPS và làm chậm đáng kể tiến trình CI/CD deployment mạng.</p>
          <h3>Các chiến lược giảm dung lượng cốt lõi:</h3>
          <ul>
            <li><strong>Sử dụng Base Image gọn nhẹ (như Alpine, Slim):</strong> Thay vì <code>FROM ubuntu</code> hoặc <code>FROM node:18</code> (nặng ~1GB), hãy dùng <code>FROM node:18-alpine</code> (chỉ ~100MB).</li>
            <li><strong>Loại bỏ Cache cài đặt:</strong> Xóa các file rác sinh ra trong quá trình cài package (ví dụ: <code>rm -rf /var/lib/apt/lists/*</code> hoặc sử dụng <code>--no-cache</code> ở npm/yarn).</li>
            <li><strong>Sử dụng tệp .dockerignore:</strong> Ngăn chặn copy các thư mục nặng như <code>node_modules/</code> hoặc <code>.git/</code> từ máy host vào container.</li>
            <li><strong>Multi-stage Builds:</strong> Kỹ thuật tách rời giai đoạn Build và giai đoạn Chạy (Runtime). Giúp loại bỏ hoàn toàn compilers nặng nề ra khỏi ảnh cuối cùng.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Tệp nào được sử dụng để ngăn chặn các thư mục nặng như node_modules/ bị nạp vào Build Context?",
            options: [
              ".gitignore",
              ".dockerignore",
              "docker-compose.yml",
              "Dockerfile"
            ],
            correct: 1,
            explanation: ".dockerignore hoạt động giống .gitignore nhưng dành riêng cho Docker Engine khi đóng gói context."
          }
        ]
      },
      {
        id: "l3-base-images",
        title: "3.5 Phân biệt các dòng Base Image: openjdk, alpine, ubuntu & distroless",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Bản đồ lựa chọn Base Image chuẩn DevOps</h2>
          <p>Việc chọn đúng base image quyết định tính ổn định, tốc độ và tính an toàn bảo mật của Container:</p>
          
          <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; border: 1px solid var(--border-color);">
            <thead>
              <tr style="background: rgba(255,255,255,0.05); border-bottom: 2px solid var(--border-color); text-align: left;">
                <th style="padding: 10px;">Dòng Image</th>
                <th style="padding: 10px;">Ưu điểm</th>
                <th style="padding: 10px;">Nhược điểm & Khi nào dùng</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight:700; color:var(--accent-blue);">ubuntu / debian</td>
                <td style="padding: 10px;">Đầy đủ thư viện, cực kỳ tương thích tốt, dễ debug lỗi.</td>
                <td style="padding: 10px;">Kích thước rất lớn (~100MB+ chưa cài app). Chỉ dùng khi app cần thư viện OS sâu.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight:700; color:var(--accent-blue);">alpine</td>
                <td style="padding: 10px;">Siêu nhẹ (~5MB hệ điều hành), tốc độ pull nhanh, bảo mật tốt (ít file).</td>
                <td style="padding: 10px;">Sử dụng bộ libc rút gọn (musl). Có thể gây lỗi với các thư viện Java/C++ native.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight:700; color:var(--accent-blue);">distroless (Google)</td>
                <td style="padding: 10px;">An toàn tuyệt đối. Chỉ chứa app và runtime, không có bash/shell, không có package manager. Không thể bị tấn công qua shell.</td>
                <td style="padding: 10px;">Khó debug cực kỳ vì không thể chui vào container gõ lệnh. Khuyên dùng cho Prod tối cao.</td>
              </tr>
            </tbody>
          </table>
        `,
        quiz: [
          {
            question: "Base Image nào bảo mật cao nhất vì loại bỏ hoàn toàn Shell (bash/sh) ra khỏi môi trường chạy?",
            options: [
              "Ubuntu",
              "CentOS",
              "Distroless",
              "Alpine"
            ],
            correct: 2,
            explanation: "Distroless của Google không chứa shell hay package manager, loại bỏ hoàn toàn vector tấn công chiếm quyền console."
          }
        ]
      },
      {
        id: "l3-security-scan",
        title: "3.6 Quét lỗ hổng bảo mật: Trivy & Docker Scout",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Chống mã độc và lỗ hổng CVE trong Container</h2>
          <p>Trước khi đưa Image lên Production, bắt buộc phải thực hiện quét (scan) các lỗ hổng bảo mật của thư viện.</p>
          <h3>1. Trivy (Hãng Aqua Security):</h3>
          <p>Công cụ quét mã nguồn mở phổ biến nhất. Quét OS packages và application dependencies (npm, maven, pip...).</p>
          <pre><code>trivy image nginx:latest</code></pre>
          <h3>2. Docker Scout:</h3>
          <p>Công cụ phân tích cấu trúc image được tích hợp trực tiếp sẵn trong Docker Desktop.</p>
          <pre><code>docker scout cves nginx:latest</code></pre>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy quét lỗ hổng bảo mật của hệ thống bằng lệnh trivy.",
          expectedState: { command: "trivy" },
          hints: [
            "Gõ lệnh `trivy` vào console ảo để khởi chạy bộ quét an ninh."
          ],
          solutions: "trivy"
        },
        quiz: [
          {
            question: "Lợi ích của việc quét bảo mật (Trivy/Scout) trước khi deploy là gì?",
            options: [
              "Làm cho code không bị lỗi logic.",
              "Phát hiện sớm các thư viện cũ bị dính lỗi bảo mật đã công bố (CVE) để tiến hành nâng cấp.",
              "Giảm dung lượng tệp tin.",
              "Tự động viết lại code hộ lập trình viên."
            ],
            correct: 1,
            explanation: "Scan bảo mật giúp phát hiện các mã nguồn/thư viện bên thứ ba chứa nguy cơ bị tin tặc khai thác (CVE)."
          }
        ]
      }
    ]
  },
  {
    level: 4,
    title: "Dockerfile Deep Dive",
    description: "Giải thích chi tiết từng dòng, kiểm tra cú pháp và cấu trúc thư mục chuẩn",
    topics: [
      {
        id: "l4-line-by-line",
        title: "4.1 Giải thích Từng Dòng Chỉ Thị Dockerfile Cực Chi Tiết",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Sổ tay tra cứu Dockerfile chuyên nghiệp</h2>
          <p>Mỗi câu lệnh trong Dockerfile đều có vai trò riêng cấu thành hệ điều hành thu nhỏ của ứng dụng:</p>
          
          <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; border: 1px solid var(--border-color);">
            <thead>
              <tr style="background: rgba(255,255,255,0.05); border-bottom: 2px solid var(--border-color); text-align: left;">
                <th style="padding: 10px; width: 25%;">Chỉ thị</th>
                <th style="padding: 10px;">Giải thích chi tiết & Tác dụng từng dòng</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">FROM</td>
                <td style="padding: 10px;"><strong>Định nghĩa Base Image nền móng.</strong> Ví dụ <code>FROM node:18-alpine</code>. Alpine là phiên bản Linux siêu gọn nhẹ (chỉ khoảng 5MB), giúp giảm dung lượng image đáng kể.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">WORKDIR</td>
                <td style="padding: 10px;"><strong>Thiết lập thư mục hoạt động bên trong Container.</strong> Nếu thư mục chưa tồn tại, Docker sẽ tự động khởi tạo (ví dụ: <code>WORKDIR /app</code>). Các lệnh tiếp theo như COPY, RUN, CMD sẽ thực thi tại đây.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">COPY vs ADD</td>
                <td style="padding: 10px;">
                  <code>COPY [host] [container]</code>: Sao chép tệp tin đơn thuần từ máy dev vào container. An toàn và khuyên dùng.<br>
                  <code>ADD</code>: Nâng cao hơn, tự động giải nén tệp tin <code>.tar.gz</code> hoặc tải tệp tin từ URL mạng.
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">RUN</td>
                <td style="padding: 10px;"><strong>Thực thi lệnh TRONG QUÁ TRÌNH BUILD.</strong> Ví dụ: <code>RUN npm install</code> hoặc <code>RUN apt-get update && apt-get install -y curl</code>. Kết quả của lệnh này được lưu cứng thành một Layer vĩnh viễn của Image.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">CMD vs ENTRYPOINT</td>
                <td style="padding: 10px;">
                  Cả hai đều chỉ định câu lệnh khởi động ứng dụng <strong>KHI CONTAINER RUN</strong>.<br>
                  <code>CMD</code>: Có thể bị ghi đè (override) dễ dàng khi gõ lệnh run.<br>
                  <code>ENTRYPOINT</code>: Rất khó bị ghi đè, thường làm khung chạy chính (ví dụ: <code>ENTRYPOINT ["java", "-jar"]</code>) và ghép tham số từ CMD.
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">ENV vs ARG</td>
                <td style="padding: 10px;">
                  <code>ARG</code> (Build Argument): Biến môi trường chỉ có tác dụng trong lúc build. Khi ra lò image, biến này biến mất.<br>
                  <code>ENV</code> (Environment Variable): Biến môi trường tồn tại vĩnh viễn cả khi Container hoạt động thực tế trên RAM.
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">EXPOSE</td>
                <td style="padding: 10px;">Tuyên bố cổng mạng nội bộ mà ứng dụng lắng nghe (như <code>EXPOSE 8080</code>).</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-family: monospace; color: var(--accent-blue);">VOLUME</td>
                <td style="padding: 10px;">Tạo phân vùng gắn kết ổ đĩa ngoài để tránh mất dữ liệu khi container bị xóa.</td>
              </tr>
            </tbody>
          </table>
        `,
        quiz: [
          {
            question: "Sự khác biệt mấu chốt giữa RUN và CMD là gì?",
            options: [
              "RUN chạy khi container khởi động, CMD chạy lúc build image.",
              "RUN chạy lúc build image để tạo Layer tĩnh, CMD chạy lúc khởi tạo container từ image tĩnh đó.",
              "RUN dùng cho hệ điều hành Windows, CMD dùng cho Linux.",
              "Không có sự khác biệt nào."
            ],
            correct: 1,
            explanation: "RUN biên dịch/cài đặt dependencies tĩnh cấu thành Image. CMD chỉ là câu lệnh kích hoạt ứng dụng khi container chuyển trạng thái sang Running."
          }
        ]
      },
      {
        id: "l4-project-structure",
        title: "4.2 Cấu trúc Dự án chuẩn: Để Dockerfile & Compose ở đâu?",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Quy hoạch cấu trúc thư mục dự án DevOps chuẩn chỉnh</h2>
          <p>Đối với các dự án thực tế bao gồm Frontend, Backend và Database (Multi-service Mono-repo), việc đặt các tệp cấu hình đúng chỗ là cực kỳ quan trọng để Docker Compose có thể biên dịch tự động.</p>
          
          <h3>Mô hình cấu trúc thư mục khuyên dùng:</h3>
          <div class="visual-tree" style="background:#1e1e2f; padding: 1.5rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; color: #a5b4fc; line-height: 1.6;">
            <strong>my-fullstack-app/</strong> (Thư mục gốc của dự án)<br>
            ├── <strong>compose.yaml</strong> (ĐẶT Ở THƯ MỤC GỐC - quản lý toàn bộ hệ thống)<br>
            ├── <strong>frontend-react/</strong><br>
            │   ├── src/<br>
            │   ├── package.json<br>
            │   └── <strong>Dockerfile</strong> (Đặt ở thư mục con - build frontend)<br>
            ├── <strong>backend-springboot/</strong><br>
            │   ├── src/<br>
            │   ├── pom.xml<br>
            │   └── <strong>Dockerfile</strong> (Đặt ở thư mục con - build backend)<br>
            └── <strong>database/</strong> (Nếu có script khởi tạo)<br>
                └── init.sql
          </div>

          <h3>Tại sao lại phân chia như vậy?</h3>
          <ul>
            <li><strong>Dockerfile ở từng thư mục dịch vụ:</strong> Giúp cô lập ngữ cảnh (Build Context) của từng service. Khi đóng gói backend, Docker chỉ cần đọc các tệp tin java/maven trong <code>backend-springboot/</code> mà không bị thừa file của frontend.</li>
            <li><strong>compose.yaml ở thư mục gốc:</strong> Đóng vai trò là trung tâm điều phối toàn bộ các thư mục con. Nó có thể tham chiếu trực tiếp đến Dockerfile của từng dịch vụ bằng đường dẫn tương đối: <code>build: ./backend-springboot</code> hoặc <code>build: ./frontend-react</code>.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Trong một dự án gồm React Frontend và Spring Boot Backend, tệp compose.yaml nên được đặt ở vị trí nào?",
            options: [
              "Đặt bên trong thư mục frontend-react.",
              "Đặt bên trong thư mục backend-springboot.",
              "Đặt ở thư mục gốc (Root folder) của dự án để quản lý điều hướng các thư mục con.",
              "Đặt ở màn hình Desktop máy tính."
            ],
            correct: 2,
            explanation: "Đặt compose.yaml ở thư mục gốc cho phép nó liên kết và tham chiếu các service ở các thư mục con một cách gọn gàng."
          }
        ]
      },
      {
        id: "l4-multistage-spring",
        title: "4.3 Thực hành: Viết Dockerfile Multi-stage tối ưu",
        badge: "Practice",
        difficulty: "Advanced",
        content: `
          <h2>Thực hành viết và kiểm tra cú pháp Dockerfile</h2>
          <p>Hãy hoàn thiện Stage 2 của Dockerfile ở bên tab VSCode IDE để chạy runtime ứng dụng Spring Boot tối ưu và gọn nhẹ nhất.</p>
        `,
        practice: {
          type: "editor",
          instructions: "Hoàn thiện Stage 2 của Dockerfile cho Spring Boot 3 sử dụng eclipse-temurin:21-jre-alpine bên tab VSCode IDE.",
          editorFiles: [
            {
              name: "Dockerfile",
              content: "# Stage 1: Build\nFROM maven:3.9.6-eclipse-temurin-21-alpine AS builder\nWORKDIR /app\nCOPY pom.xml .\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\n# Stage 2: Runtime (HÃY TỰ TAY VIẾT TIẾP BÊN DƯỚI NÀY)\n# 1. Khởi tạo môi trường runtime gọn nhẹ từ: eclipse-temurin:21-jre-alpine\n# 2. Định nghĩa thư mục làm việc /app bên trong container\n# 3. Sao chép tệp tin build *.jar từ builder stage sang với tên: app.jar\n# 4. EXPOSE cổng 8080 cho ứng dụng Spring Boot\n# 5. Thiết lập ENTRYPOINT chạy ứng dụng: [\"java\", \"-jar\", \"app.jar\"]\n\n"
            },
            {
              name: "pom.xml",
              content: "<project></project>"
            }
          ],
          expectedState: {
            file: "Dockerfile",
            contains: ["FROM eclipse-temurin:21-jre-alpine", "WORKDIR /app", "COPY --from=builder /app/target/*.jar app.jar", "EXPOSE 8080", "ENTRYPOINT"]
          },
          hints: [
            "Bắt đầu Stage 2 bằng: `FROM eclipse-temurin:21-jre-alpine`",
            "Khai báo thư mục hoạt động: `WORKDIR /app`",
            "Sao chép tệp đã build từ stage builder sang runtime: `COPY --from=builder /app/target/*.jar app.jar`",
            "Mở cổng mạng Spring Boot: `EXPOSE 8080`",
            "Thiết lập bộ khởi chạy java: `ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]`"
          ],
          solutions: "FROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY --from=builder /app/target/*.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
        },
        quiz: [
          {
            question: "Lợi ích lớn nhất của việc copy --from=builder trong Dockerfile là gì?",
            options: [
              "Giúp ứng dụng kết nối mạng nhanh hơn.",
              "Chỉ trích xuất file binary/chạy cuối cùng sang image mới, loại bỏ hoàn toàn các compiler nặng nề của stage build trước đó.",
              "Bảo mật code bằng cách mã hóa file jar.",
              "Không cần sử dụng docker compose."
            ],
            correct: 1,
            explanation: "Nó giúp giảm kích thước image rõ rệt bằng cách loại bỏ các bộ build cồng kềnh như Maven/JDK."
          }
        ]
      },
      {
        id: "l4-env-vs-arg",
        title: "4.4 ENV vs ARG: Tránh sai lầm bảo mật kinh điển",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Sự khác biệt cực kỳ quan trọng giữa ENV và ARG</h2>
          <p>Người mới viết Dockerfile hay nhầm lẫn hai loại biến này, dẫn đến lộ lọt mật khẩu hoặc lỗi runtime:</p>
          <ul>
            <li><strong>ARG (Build Argument):</strong>
              <br>- Chỉ tồn tại **trong quá trình build image**.
              <br>- Dùng để nạp động các phiên bản phần mềm (ví dụ: <code>ARG NODE_VERSION=18</code>).
              <br>- Khi Image đã xuất xưởng, biến này biến mất. **Tuyệt đối không lưu mật khẩu ở đây vì có thể bị soi qua docker history!**
            </li>
            <li><strong>ENV (Environment Variable):</strong>
              <br>- Tồn tại **cả lúc build lẫn lúc container hoạt động trên RAM**.
              <br>- Dùng để cấu hình runtime (ví dụ: <code>ENV PORT=8080</code>, <code>ENV NODE_ENV=production</code>).
              <br>- Có thể dễ dàng ghi đè (override) khi dùng lệnh <code>docker run -e</code> hoặc cấu hình trong Docker Compose.
            </li>
          </ul>
        `,
        quiz: [
          {
            question: "Bạn muốn truyền phiên bản thư viện cần tải động lúc build image, bạn nên chọn gì?",
            options: [
              "ENV",
              "ARG",
              "VOLUME",
              "EXPOSE"
            ],
            correct: 1,
            explanation: "ARG được thiết kế riêng để nhận tham số truyền vào khi chạy câu lệnh docker build --build-arg."
          }
        ]
      },
      {
        id: "l4-cmd-vs-entrypoint",
        title: "4.5 CMD vs ENTRYPOINT: So sánh chuyên sâu",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>Quy tắc vàng điều khiển câu lệnh khởi chạy Container</h2>
          <p>Khi container bắt đầu hoạt động, nó cần một câu lệnh làm tiêu điểm chạy ngầm chính. Có 2 cách định nghĩa:</p>
          <h3>1. CMD (Default Command):</h3>
          <p>Định nghĩa câu lệnh hoặc tham số mặc định. Có thể bị ghi đè hoàn toàn dễ dàng.</p>
          <p>Ví dụ: <code>CMD ["echo", "Hello"]</code>. Nếu chạy <code>docker run my-image ls</code>, lệnh <code>ls</code> sẽ đè mất và lệnh <code>echo</code> không chạy nữa.</p>
          
          <h3>2. ENTRYPOINT (Executable):</h3>
          <p>Định nghĩa khung thực thi cố định, rất khó bị ghi đè (phải truyền flag <code>--entrypoint</code> để đè).</p>
          <p>Ví dụ: <code>ENTRYPOINT ["ping"]</code> kết hợp <code>CMD ["google.com"]</code>. Khi khởi chạy, container sẽ thực thi <code>ping google.com</code>. Nếu chạy <code>docker run my-image facebook.com</code>, container sẽ chạy <code>ping facebook.com</code> (CMD đóng vai trò làm tham số truyền động).</p>
        `,
        quiz: [
          {
            question: "Nếu Dockerfile có cả ENTRYPOINT [\"npm\"] và CMD [\"start\"], container sẽ chạy lệnh nào?",
            options: [
              "npm start",
              "Chỉ chạy npm",
              "Chỉ chạy start",
              "Báo lỗi cú pháp"
            ],
            correct: 0,
            explanation: "Docker tự động ghép các phần tử trong CMD làm tham số truyền tiếp vào phía sau lệnh ENTRYPOINT."
          }
        ]
      },
      {
        id: "l4-healthcheck-secrets",
        title: "4.6 Tự giám sát sức khỏe container: HEALTHCHECK & Secrets",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>1. Cấu hình HEALTHCHECK tự giám sát sự cố</h2>
          <p>Mặc định, Docker chỉ biết Container còn sống hay chết dựa trên trạng thái tiến trình (PID). Nếu tiến trình Node/Java bị treo đơ (Deadlock) nhưng process chưa thoát, Docker vẫn báo container xanh (Running).</p>
          <p><strong>Giải pháp:</strong> Định nghĩa HEALTHCHECK định kỳ ping thử endpoint kiểm tra sức khỏe ứng dụng:</p>
          <pre><code>HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1</code></pre>

          <h2>2. Sử dụng Secrets an toàn trong Dockerfile</h2>
          <p>Không bao giờ hardcode API Keys, SSH keys vào mã nguồn hoặc Image Layers. Sử dụng tính năng mount secret lúc build:</p>
          <pre><code>RUN --mount=type=secret,id=my-key cat /run/secrets/my-key</code></pre>
        `,
        quiz: [
          {
            question: "Chỉ thị HEALTHCHECK định kỳ trả về mã thoát (exit code) nào để báo hiệu container bị lỗi đơ (unhealthy)?",
            options: [
              "exit 0",
              "exit 1",
              "exit 200",
              "Không cần exit code"
            ],
            correct: 1,
            explanation: "exit 1 báo hiệu cho Docker Engine biết ứng dụng đã bị đơ đứng, chuyển trạng thái sang (unhealthy) để tự động restart."
          }
        ]
      }
    ]
  },
  {
    level: 5,
    title: "Docker Compose",
    description: "Cấu hình compose.yaml liên kết đa container: React, Spring Boot, DB",
    topics: [
      {
        id: "l5-syntax-detail",
        title: "5.1 Giải thích cách viết file compose.yaml từng dòng",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Giải nghĩa từng dòng cấu hình Docker Compose</h2>
          <p>Tệp <code>compose.yaml</code> (hoặc <code>docker-compose.yml</code>) là tập hợp định nghĩa hệ thống. Hãy xem chi tiết một cấu trúc chuẩn:</p>

          <pre><code><strong>services:</strong> # 1. Khai báo danh sách các containers trong hệ sinh thái
  <strong>db:</strong> # Tên Service (được dùng làm DNS hostname nội bộ)
    <strong>image:</strong> postgres:15-alpine # Tải trực tiếp image từ Docker Hub
    <strong>environment:</strong> # 2. Thiết lập các biến môi trường cấu hình DB
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: secret_password
      POSTGRES_DB: app_db
    <strong>ports:</strong> # 3. Cấu hình ánh xạ cổng: [máy_host]:[container]
      - "5432:5432"
    <strong>volumes:</strong> # 4. Gắn kết ổ đĩa để lưu trữ dữ liệu vĩnh viễn ra host
      - pg-data:/var/lib/postgresql/data

  <strong>backend:</strong>
    <strong>build:</strong> ./backend-springboot # 5. Tự động build Dockerfile trong thư mục con này
    <strong>ports:</strong>
      - "8080:8080"
    <strong>depends_on:</strong> # 6. Chỉ thị khởi chạy: container db phải chạy TRƯỚC backend
      - db
    <strong>environment:</strong>
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/app_db

<strong>volumes:</strong> # 7. Khai báo các Volume dùng chung
  pg-data:</code></pre>
        `,
        quiz: [
          {
            question: "Chỉ thị nào trong compose.yaml quy định thứ tự khởi động của container?",
            options: ["ports", "environment", "depends_on", "build"],
            correct: 2,
            explanation: "depends_on giúp xác định container nào khởi động trước container nào để tránh lỗi mất kết nối ban đầu."
          }
        ]
      },
      {
        id: "l5-react-spring-postgres",
        title: "5.2 Thực hành: Liên kết React + Spring Boot + PostgreSQL",
        badge: "Practice",
        difficulty: "Advanced",
        content: `
          <h2>Tách biệt Database và ứng dụng Fullstack</h2>
          <p>Hãy chuyển qua tab VSCode IDE và hoàn thiện tệp compose.yaml để khai báo liên kết giữa ứng dụng backend Spring Boot và cơ sở dữ liệu PostgreSQL.</p>
        `,
        practice: {
          type: "editor",
          instructions: "Hoàn thiện tệp compose.yaml khai báo 2 service: 'db' và 'backend' kết nối với nhau ở tab VSCode IDE.",
          editorFiles: [
            {
              name: "compose.yaml",
              content: "# 📝 THỰC HÀNH: Khởi tạo file compose.yaml kết nối đa container\n# Hãy tự tay viết các dòng lệnh Docker Compose chuẩn dưới đây:\n# 1. Khai báo danh mục ngoài cùng: services:\n# 2. Khai báo service 'db' sử dụng image postgres:15-alpine\n#    - Thiết lập environment: POSTGRES_USER=user, POSTGRES_PASSWORD=password, POSTGRES_DB=appdb\n#    - Ánh xạ cổng (ports): 5432:5432\n#    - Khai báo volume: pgdata:/var/lib/postgresql/data\n# 3. Khai báo service 'backend' tự động build thư mục hiện tại (build: .)\n#    - Ánh xạ cổng (ports): 8080:8080\n#    - Định nghĩa depends_on: db (chờ db khởi động trước)\n#    - Thiết lập environment: SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/appdb\n# 4. Khai báo root volume dùng chung ở cuối cùng: volumes: pgdata:\n\n"
            },
            {
              name: "Dockerfile",
              content: "FROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY app.jar .\nCMD [\"java\", \"-jar\", \"app.jar\"]"
            }
          ],
          expectedState: {
            file: "compose.yaml",
            contains: ["services:", "db:", "image: postgres:15-alpine", "environment:", "POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB", "ports:", "5432:5432", "volumes:", "pgdata:/var/lib/postgresql/data", "backend:", "build:", "8080:8080", "depends_on:", "db", "volumes:", "pgdata:"]
          },
          hints: [
            "YAML thụt lề cực kỳ quan trọng! Sử dụng 2 dấu cách cho mỗi cấp độ thụt lề thụ động.",
            "Khai báo `services:` đầu tiên ở lề sát trái.",
            "Ở service `db`, đảm bảo truyền đúng mật khẩu `POSTGRES_PASSWORD: password`.",
            "Ở service `backend`, sử dụng chỉ thị `build: .` để tìm Dockerfile.",
            "Khai báo root volume `volumes: pgdata:` ở hàng cuối cùng không có dấu thụt lề."
          ],
          solutions: "services:\n  db:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: password\n      POSTGRES_DB: appdb\n    ports:\n      - \"5432:5432\"\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n  backend:\n    build: .\n    ports:\n      - \"8080:8080\"\n    depends_on:\n      - db\n    environment:\n      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/appdb\n\nvolumes:\n  pgdata:"
        },
        quiz: [
          {
            question: "Làm thế nào Backend giao tiếp được với Database trong Docker Compose network?",
            options: [
              "Thông qua cổng mạng Public IP của VPS.",
              "Gọi trực tiếp theo Tên Service (ví dụ host là 'db') nhờ cơ chế DNS nội bộ của Compose.",
              "Không thể kết nối trực tiếp.",
              "Bắt buộc phải đi qua Nginx."
            ],
            correct: 1,
            explanation: "Docker Compose cung cấp một internal mạng ảo có DNS tự động phân giải tên service thành địa chỉ IP."
          }
        ]
      },
      {
        id: "l5-volumes-deep",
        title: "5.3 Volume chuyên sâu: Bind Mounts vs Named Volumes vs Anonymous Volumes",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Phân biệt 3 loại gắn kết ổ đĩa ngoài vào Container</h2>
          <p>Lưu trữ dữ liệu trong Docker được chia làm 3 cơ chế ứng dụng tùy ngữ cảnh:</p>
          <ul>
            <li><strong>1. Bind Mount (Gắn đường dẫn tuyệt đối):</strong>
              <br>- Gắn trực tiếp 1 thư mục bất kỳ trên máy host vào container (ví dụ: <code>-v /opt/data:/app/data</code> hoặc <code>./src:/app/src</code>).
              <br>- Thay đổi ở máy host lập tức cập nhật vào container. **Cực kỳ phù hợp cho môi trường Dev để hot-reload code.**
            </li>
            <li><strong>2. Named Volume (Volume có tên do Docker quản lý):</strong>
              <br>- Docker tự quản lý phân vùng đĩa trong thư mục hệ thống (ví dụ: <code>-v dbdata:/var/lib/mysql</code>).
              <br>- Hiệu năng cao hơn, an toàn, dễ backup. **Khuyên dùng cho Database trên môi trường Production.**
            </li>
            <li><strong>3. Anonymous Volume (Volume ẩn danh):</strong>
              <br>- Không khai báo tên (ví dụ: <code>-v /app/node_modules</code>).
              <br>- Dùng để bảo vệ chống ghi đè/giữ nguyên thư mục nội bộ của container khi có bind mount tổng.
            </li>
          </ul>
        `,
        quiz: [
          {
            question: "Cơ chế mount nào phù hợp nhất cho môi trường phát triển (Dev) để code hot-reload trực tiếp không cần build lại image?",
            options: [
              "Named Volume",
              "Bind Mount",
              "Anonymous Volume",
              "Không sử dụng volume"
            ],
            correct: 1,
            explanation: "Bind mount kết nối trực tiếp folder code của máy host vào container, giúp ứng dụng nhận diện thay đổi tức thì."
          }
        ]
      },
      {
        id: "l5-env-override",
        title: "5.4 Quản lý tham số qua tệp .env & Override compose.prod.yaml",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>Mô hình quản lý cấu hình chuyên nghiệp trong dự án lớn</h2>
          <h3>1. Tách biệt cấu hình bằng tệp .env</h3>
          <p>Tạo một tệp <code>.env</code> ở thư mục gốc chứa các khóa cấu hình bảo mật:</p>
          <pre><code>DB_USER=dev_admin
DB_PASS=SuperSecurePassword123</code></pre>
          <p>Trong <code>compose.yaml</code>, ta chỉ cần gọi tên biến:</p>
          <pre><code>POSTGRES_USER: \${DB_USER}
POSTGRES_PASSWORD: \${DB_PASS}</code></pre>

          <h3>2. Kỹ thuật ghi đè môi trường (Override Compose)</h3>
          <p>Tránh viết trùng lặp cấu hình bằng cách tách thành nhiều file:</p>
          <ul>
            <li><code>compose.yaml</code>: Định nghĩa khung xương chính (services, ports, volumes).</li>
            <li><code>compose.override.yaml</code>: Dành cho máy Dev local (tự động load, mount bind code).</li>
            <li><code>compose.prod.yaml</code>: Cho Production Server (loại bỏ ports DB, bật cấu hình tối ưu hiệu năng).</li>
          </ul>
          <p><strong>Cú pháp chạy gộp file trên server:</strong></p>
          <pre><code>docker compose -f compose.yaml -f compose.prod.yaml up -d</code></pre>
        `,
        quiz: [
          {
            question: "Làm thế nào để chạy kết hợp cấu hình gốc và cấu hình đặc thù dành riêng cho Production?",
            options: [
              "Chạy hai lệnh độc lập.",
              "Sử dụng nhiều flag -f để gộp tệp cấu hình: docker compose -f compose.yaml -f compose.prod.yaml up -d",
              "Copy đè nội dung file này vào file kia bằng thủ công.",
              "Không thể gộp file compose."
            ],
            correct: 1,
            explanation: "Sử dụng cờ -f (file) cho phép Docker Compose nạp nhiều file cấu hình theo thứ tự và tự động override ghi đè các tham số trùng tên."
          }
        ]
      }
    ]
  },
  {
    level: 6,
    title: "Database với Docker",
    description: "Quản lý dữ liệu bền vững, backup & restore cơ sở dữ liệu trên Docker",
    topics: [
      {
        id: "l6-postgres-mssql",
        title: "6.1 Chạy và sao lưu PostgreSQL & SQL Server",
        badge: "Practice",
        difficulty: "Intermediate",
        content: `
          <h2>Persist dữ liệu Database & Lệnh Backup/Restore</h2>
          <p>Chạy PostgreSQL với Volume lưu trữ lâu dài:</p>
          <pre><code>docker run -d -p 5432:5432 --name my-postgres -v db-vol:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:15-alpine</code></pre>
          <h3>1. Lệnh Backup (Trích xuất file sql):</h3>
          <pre><code>docker exec -t my-postgres pg_dumpall -U postgres > backup.sql</code></pre>
          <h3>2. Lệnh Restore:</h3>
          <pre><code>docker exec -i my-postgres psql -U postgres < backup.sql</code></pre>
        `,
        practice: {
          type: "terminal",
          instructions: "Hãy khởi chạy container PostgreSQL tên 'my-postgres' trên port 5432, mật khẩu POSTGRES_PASSWORD='secret', mount volume 'db-vol'.",
          expectedState: { command: "docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=secret -v db-vol:/var/lib/postgresql/data postgres:15-alpine" },
          hints: [
            "Sử dụng flag `-d` chạy ngầm, `--name my-postgres`.",
            "Map cổng `-p 5432:5432`.",
            "Mount volume bằng `-v db-vol:/var/lib/postgresql/data`.",
            "Khai báo environment `-e POSTGRES_PASSWORD=secret`."
          ],
          solutions: "docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=secret -v db-vol:/var/lib/postgresql/data postgres:15-alpine"
        },
        quiz: [
          {
            question: "Làm cách nào để trích xuất backup.sql mà không cần cài đặt Postgres client lên máy host?",
            options: [
              "Dừng database container rồi copy.",
              "Sử dụng docker exec chạy lệnh pg_dumpall được đóng gói sẵn ngay trong container và chuyển hướng dữ liệu (redirect) ra file ngoài máy host.",
              "Không thể backup.",
              "Upload lên Docker Hub."
            ],
            correct: 1,
            explanation: "Chạy pg_dumpall bên trong môi trường container thông qua docker exec là phương án tối ưu nhất."
          }
        ]
      },
      {
        id: "l6-nosql-databases",
        title: "6.2 MongoDB & Redis: Triển khai & Tối ưu hóa dữ liệu",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Triển khai các dòng NoSQL Database phổ biến</h2>
          
          <h3>1. MongoDB Container:</h3>
          <p>Triển khai cơ sở dữ liệu Document-oriented Mongo:</p>
          <pre><code>docker run -d --name my-mongo \\
  -e MONGO_INITDB_ROOT_USERNAME=admin \\
  -e MONGO_INITDB_ROOT_PASSWORD=secret \\
  -v mongo-data:/data/db \\
  -p 27017:27017 \\
  mongo:6.0</code></pre>

          <h3>2. Redis Container (Caching layer):</h3>
          <p>Triển khai bộ nhớ đệm (In-memory cache) cực nhanh, giới hạn RAM để tránh đơ VPS:</p>
          <pre><code>docker run -d --name my-redis \\
  -p 6379:6379 \\
  -v redis-data:/data \\
  redis:7.0-alpine redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru</code></pre>
        `,
        quiz: [
          {
            question: "Tại sao nên giới hạn RAM tối đa (maxmemory) khi triển khai Redis trên Container?",
            options: [
              "Để tránh container sử dụng quá mức bộ nhớ của máy host và bị hệ điều hành tắt đột ngột (OOM Killed).",
              "Để giảm độ trễ của ổ đĩa cứng.",
              "Để dữ liệu tự động lưu trữ vĩnh viễn.",
              "Không cần thiết."
            ],
            correct: 0,
            explanation: "Redis chạy hoàn toàn trên RAM. Nếu không khống chế dung lượng, nó có thể ăn hết tài nguyên RAM vật lý của host OS dẫn tới lỗi sập nguồn tiến trình."
          }
        ]
      }
    ]
  },
  {
    level: 7,
    title: "Fullstack Deployment",
    description: "Triển khai ứng dụng production qua Nginx Reverse Proxy bảo mật SSL",
    topics: [
      {
        id: "l7-nginx-ssl",
        title: "7.1 Nginx Reverse Proxy & SSL Gateway",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>Reverse Proxy bảo mật môi trường Production</h2>
          <p>Trên production server (VPS), ta không mở trực tiếp các cổng của backend (8080) hay frontend (3000) ra ngoài Internet.</p>
          <p>Thay vào đó, ta dựng một container <strong>Nginx làm Gateway tập trung</strong> ở cổng 80/443. Nginx điều phối traffic đến các container phía sau và chịu trách nhiệm cấu hình SSL (HTTPS) Let's Encrypt.</p>
        `,
        quiz: [
          {
            question: "Lợi ích lớn nhất khi sử dụng Nginx làm Reverse Proxy trước các container ứng dụng là gì?",
            options: [
              "Che giấu cấu trúc mạng nội bộ, quản lý cổng HTTPS/SSL tập trung và tối ưu hóa xử lý static content.",
              "Làm cho cơ sở dữ liệu Postgres chạy nhanh hơn.",
              "Không cần sử dụng Dockerfile.",
              "Thay thế hoàn toàn Java."
            ],
            correct: 0,
            explanation: "Nginx đóng vai trò là một lá chắn Gateway bảo mật, tối ưu hóa băng thông và giải mã HTTPS tập trung trước khi chuyển tiếp yêu cầu vào các container nội bộ."
          }
        ]
      }
    ]
  },
  {
    level: 8,
    title: "Advanced Docker",
    description: "Vận hành Network Drivers, Docker Security & Giám sát Monitoring Prometheus",
    topics: [
      {
        id: "l8-drivers-security",
        title: "8.1 Drivers Network & Docker Security",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>1. Phân biệt Docker Network Drivers</h2>
          <ul>
            <li><strong>Bridge:</strong> Mạng ảo local mặc định giữa các container trên cùng 1 host.</li>
            <li><strong>Host:</strong> Loại bỏ cô lập mạng, container dùng chung cổng và interface trực tiếp với máy host.</li>
            <li><strong>Overlay:</strong> Kết nối container phân tán trên các VPS khác nhau (Swarm/K8s).</li>
          </ul>
          <h2>2. Bảo mật container chuyên nghiệp</h2>
          <p>Mặc định container chạy bằng đặc quyền <strong>root</strong>. Để tăng cường an ninh bảo mật, luôn sử dụng chỉ thị <code>USER non-root</code> trong Dockerfile để chặn đứng nguy cơ tấn công leo thang đặc quyền phá hoại host OS.</p>
        `,
        quiz: [
          {
            question: "Tại sao nên chạy container dưới quyền của một Non-Root User?",
            options: [
              "Để container chạy nhanh hơn.",
              "Hạn chế rủi ro bảo mật: Nếu tin tặc hack chiếm quyền container, chúng không thể lợi dụng quyền Root để truy cập và phá hủy hệ điều hành Host vật lý.",
              "Bắt buộc của Docker.",
              "Để giảm dung lượng ổ cứng."
            ],
            correct: 1,
            explanation: "Quy tắc đặc quyền tối thiểu (Least Privilege) giúp cô lập hoàn toàn thiệt hại nếu container bị tấn công."
          }
        ]
      }
    ]
  },
  {
    level: 9,
    title: "CI/CD Pipeline & DevOps",
    description: "Đồ án capstone DevOps: Tự động hóa toàn diện với GitHub Actions & Auto-Grading",
    topics: [
      {
        id: "l9-concepts",
        title: "9.1 Git Workflow & CI/CD Pipeline Concepts",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Quy trình DevOps chuẩn hóa Git-flow chuyên nghiệp</h2>
          <p>Để tự động hóa việc đưa sản phẩm lên mây (Cloud), toàn bộ luồng code được tích hợp qua Git-flow:</p>
          <div class="visual-schema" style="background:#1e1e2f; padding:1.5rem; border-radius:8px; font-family:monospace; color:#a5b4fc;">
            [ Nhánh feature ] ──( Create PR )──> [ Nhánh develop (Chạy test tự động) ] <br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⬇<br>
            [ Nhánh main / release ] ──( Merge )──> [ Auto Build & Deploy VPS (Zero-Downtime) ]
          </div>
          <h3>Các trụ cột của CI/CD Pipeline:</h3>
          <ul>
            <li><strong>CI (Continuous Integration):</strong> Lập trình viên đẩy code lên Git ➜ Tự động kích hoạt bộ biên dịch, chạy Unit Test (JUnit, Jest) để đảm bảo không bị vỡ logic.</li>
            <li><strong>CD (Continuous Delivery/Deployment):</strong> Sau khi pass test ➜ Tự động đóng gói Docker Image ➜ Push lên Docker Hub ➜ SSH trực tiếp vào Server VPS kéo ảnh mới về khởi chạy.</li>
          </ul>
        `,
        quiz: [
          {
            question: "CI (Continuous Integration) chịu trách nhiệm về nhiệm vụ nào?",
            options: [
              "Hỏi ý kiến khách hàng.",
              "Tự động tích hợp code mới, biên dịch và chạy các bộ kiểm thử đơn vị (Unit Tests) để phát hiện sớm các xung đột lỗi.",
              "Mua thêm máy chủ mới.",
              "Cài đặt hệ điều hành cho VPS."
            ],
            correct: 1,
            explanation: "CI giúp phát hiện lỗi logic ngay khi lập trình viên vừa nộp code lên kho chứa chung bằng cách kích hoạt test suite tự động."
          }
        ]
      },
      {
        id: "l9-bluegreen",
        title: "9.2 Triển khai không gián đoạn: Blue-Green & Rollback",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>Nghệ thuật Zero-Downtime Deployment</h2>
          <p>Khi cập nhật ứng dụng trên server thực tế, làm thế nào để khách hàng không bị lỗi 502 Bad Gateway trong vài phút ứng dụng khởi chạy?</p>
          
          <h3>1. Blue-Green Deployment:</h3>
          <p>Duy trì song song hai môi trường chạy:</p>
          <ul>
            <li><strong>Blue (Hiện tại):</strong> Container v1 đang trực tiếp hứng 100% traffic khách hàng.</li>
            <li><strong>Green (Mới):</strong> Container v2 được deploy và test nội bộ thành công.</li>
            <li>Sau khi Green OK ➜ Nginx chuyển hướng Proxy từ Blue sang Green chỉ trong 0.1 giây.</li>
          </ul>

          <h3>2. Cơ chế Rollback tức thì:</h3>
          <p>Nếu phiên bản v2 chạy Green phát sinh lỗi nghiêm trọng sau 5 phút deploy, hệ thống chỉ cần trỏ Nginx ngược lại v1 (Blue) đang chạy sẵn ngầm, khôi phục hệ thống ngay lập tức.</p>
        `,
        quiz: [
          {
            question: "Lợi thế lớn nhất của chiến lược Blue-Green Deployment là gì?",
            options: [
              "Không cần sử dụng bộ nhớ RAM.",
              "Giúp cập nhật ứng dụng mà hệ thống hoàn toàn không có thời gian chết (Zero-Downtime) và hỗ trợ quay lui (Rollback) lỗi lập tức.",
              "Giúp ứng dụng chạy mà không cần database.",
              "Tiết kiệm chi phí phần cứng tối đa."
            ],
            correct: 1,
            explanation: "Duy trì hai môi trường chạy giúp chuyển mạch traffic tức thì, triệt tiêu thời gian chờ khởi động ứng dụng."
          }
        ]
      },
      {
        id: "l9-capstone",
        title: "9.3 Thực hành Lab & Đồ án tốt nghiệp DevOps",
        badge: "Practice",
        difficulty: "Advanced",
        content: `
          <h2>Đồ án cuối khóa: DevOps CI/CD Pipeline</h2>
          <p>Bạn sẽ trực tiếp hoàn thiện quy trình CI/CD tích hợp tự động qua GitHub Actions.</p>
          <div class="info-box">
            <p><strong>Yêu cầu thực tế:</strong></p>
            <ol>
              <li>Chuyển qua tab <strong>VSCode IDE</strong>.</li>
              <li>Kiểm tra cấu hình sườn file <code>.github/workflows/deploy.yml</code> và hoàn thiện các chỉ thị.</li>
              <li>Mở tệp test <code>src/test/java/AppTest.java</code>, sửa lại dòng code <code>assertTrue(false)</code> thành <code>assertTrue(true)</code> để bộ Maven test không bị fail!</li>
              <li>Nhấp nút <strong>"Git Commit & Push"</strong> ở góc trên bên phải của IDE.</li>
              <li>Chuyển qua tab <strong>CI/CD Pipeline</strong> để theo dõi tiến trình chạy và nhận điểm số tự động chấm!</li>
            </ol>
          </div>
        `,
        practice: {
          type: "pipeline",
          instructions: "Hãy điền đầy đủ workflows deploy.yml và sửa assertTrue(true) trong AppTest.java bên tab VSCode IDE. Sau đó click Git Commit & Push.",
          editorFiles: [
            {
              name: ".github/workflows/deploy.yml",
              content: "# 📝 THỰC HÀNH: Tự tay hoàn thiện GitHub Actions Pipeline\n# Hãy tự viết workflow hoàn chỉnh dưới đây:\nname: DevOps CI-CD Pipeline\non:\n  push:\n    branches: [ main ]\njobs:\n  test-backend:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Run Maven Tests\n        run: mvn test\n  build-and-push:\n    needs: test-backend\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Docker Build & Push\n        run: |\n          docker build -t dockerhub-user/spring-app:latest .\n          docker push dockerhub-user/spring-app:latest\n"
            },
            {
              name: "src/test/java/AppTest.java",
              content: "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertTrue;\n\npublic class AppTest {\n    @Test\n    public void testContextLoads() {\n        // ⚠️ Hãy sửa lại thành assertTrue(true) để vượt qua Unit Test!\n        assertTrue(false);\n    }\n}"
            },
            {
              name: "Dockerfile",
              content: "FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder\nWORKDIR /app\nCOPY pom.xml .\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\nFROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY --from=builder /app/target/*.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
            }
          ],
          expectedState: {
            file: ".github/workflows/deploy.yml",
            contains: ["name: DevOps CI-CD Pipeline", "on:", "push:", "branches: [ main ]", "jobs:", "test-backend:", "build-and-push:"]
          },
          hints: [
            "Tại tệp `AppTest.java`, sửa `assertTrue(false)` thành `assertTrue(true)` để Maven test pass.",
            "Tại tệp `.github/workflows/deploy.yml`, kiểm tra khai báo job `test-backend:` chạy `mvn test` và job `build-and-push:` chạy `docker build & push`.",
            "Nhấn nút màu tím 'Git Commit & Push' ở phía trên để kích hoạt chấm điểm!"
          ],
          solutions: {
            "src/test/java/AppTest.java": "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertTrue;\n\npublic class AppTest {\n    @Test\n    public void testContextLoads() {\n        // Sửa thành true để vượt qua kiểm thử đơn vị\n        assertTrue(true);\n    }\n}",
            ".github/workflows/deploy.yml": "name: DevOps CI-CD Pipeline\non:\n  push:\n    branches: [ main ]\njobs:\n  test-backend:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Run Maven Tests\n        run: mvn test\n  build-and-push:\n    needs: test-backend\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Docker Build & Push\n        run: |\n          docker build -t dockerhub-user/spring-app:latest .\n          docker push dockerhub-user/spring-app:latest"
          }
        },
        quiz: [
          {
            question: "Tại sao trong thực tế ta tuyệt đối không được ghi đè password/ssh key trực tiếp vào deploy.yml?",
            options: [
              "Vì cú pháp YAML không hỗ trợ ký tự đặc biệt.",
              "Để bảo mật thông tin nhạy cảm khỏi bị lộ lọt khi code được đẩy lên GitHub công khai (Sử dụng GitHub Secrets thay thế).",
              "Để file cấu hình nhẹ hơn.",
              "Để pipeline chạy nhanh hơn."
            ],
            correct: 1,
            explanation: "GitHub Secrets mã hóa dữ liệu nhạy cảm của bạn và chỉ nạp dưới dạng biến ẩn trong lúc chạy workflow."
          }
        ]
      }
    ]
  },
  {
    level: 10,
    title: "Kubernetes Intro",
    description: "Khám phá thế giới điều phối container cấp doanh nghiệp với Kubernetes",
    topics: [
      {
        id: "l10-k8s-basics",
        title: "10.1 Kubernetes là gì & Sự khác biệt với Docker Compose",
        badge: "Theory",
        difficulty: "Beginner",
        content: `
          <h2>Sự dịch chuyển từ Docker Compose lên Kubernetes (K8s)</h2>
          <p><strong>Docker Compose:</strong> Phù hợp quản lý đa container trên **duy nhất 1 máy chủ (single-host)**.</p>
          <p><strong>Kubernetes (K8s):</strong> Bộ điều phối (Orchestration) cấp doanh nghiệp, quản trị hàng ngàn container chạy phân tán trên **cụm hàng trăm máy chủ (Multi-node Cluster)**.</p>
          
          <h3>So sánh cơ chế hoạt động:</h3>
          <ul>
            <li><strong>Auto-healing:</strong> Nếu 1 máy chủ vật lý bị sập nguồn, K8s tự động di chuyển container sang máy chủ khác hoạt động bình thường.</li>
            <li><strong>Auto-scaling:</strong> Tự sinh thêm container nếu lượng khách hàng truy cập tăng vọt (High Traffic).</li>
          </ul>
        `,
        quiz: [
          {
            question: "Điểm yếu lớn nhất của Docker Compose khiến các dự án lớn phải dùng Kubernetes là gì?",
            options: [
              "Không hỗ trợ ngôn ngữ Java.",
              "Chỉ quản lý container chạy trên 1 máy chủ duy nhất, không thể tự động co giãn phân tán đa node cluster.",
              "Khó viết tệp YAML.",
              "Bị giới hạn hệ điều hành Windows."
            ],
            correct: 1,
            explanation: "Docker Compose thiếu cơ chế giám sát điều phối phân tán Cluster và tính năng Auto-healing tự chuyển node khi có phần cứng vật lý gặp sự cố."
          }
        ]
      },
      {
        id: "l10-k8s-objects",
        title: "10.2 Các đối tượng cốt lõi: Pod, Deployment, Service, Ingress, ConfigMap & Secret",
        badge: "Theory",
        difficulty: "Intermediate",
        content: `
          <h2>Hệ sinh thái đối tượng cơ bản trong Kubernetes</h2>
          <p>Kubernetes tổ chức quản lý tài nguyên thông qua các khái niệm (Objects) được khai báo bằng file YAML:</p>
          
          <ul>
            <li><strong>Pod:</strong> Đơn vị tính toán nhỏ nhất của K8s, chứa bên trong một hoặc một nhóm nhỏ Container chia sẻ chung ổ đĩa và IP mạng.</li>
            <li><strong>Deployment:</strong> Bộ quản lý khai báo trạng thái mong muốn của Pod. Quản lý số lượng bản sao (Replicas) đang chạy và luồng cập nhật ứng dụng.</li>
            <li><strong>Service:</strong> Đầu mối mạng ổn định làm nhiệm vụ phân tải (Load Balancing) traffic tới các Pod phía sau.</li>
            <li><strong>Ingress:</strong> Cổng Gateway điều hướng (Routing) traffic HTTP/HTTPS từ ngoài Internet vào Service nội bộ dựa trên Domain.</li>
            <li><strong>ConfigMap & Secret:</strong> Lưu trữ cấu hình và thông tin nhạy cảm tách biệt hoàn toàn khỏi mã nguồn.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Đối tượng nào trong K8s trực tiếp làm nhiệm vụ Load Balancer (cân bằng tải) cho nhóm các Pods?",
            options: [
              "Pod",
              "Service",
              "ConfigMap",
              "Docker Engine"
            ],
            correct: 1,
            explanation: "Service cung cấp một IP nội bộ cố định và cân bằng tải traffic giữa các Pod bản sao."
          }
        ]
      }
    ]
  },
  {
    level: 11,
    title: "Production Case Study",
    description: "Nghiên cứu kiến trúc dự án Fullstack triển khai thực tế trên môi trường sản xuất",
    topics: [
      {
        id: "l11-case-study",
        title: "11.1 Kiến trúc hệ thống lớn: React -> Spring Boot -> Redis -> PostgreSQL -> Nginx",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>Sơ đồ kiến trúc DevOps chuẩn hóa môi trường Production</h2>
          <p>Một dự án Fullstack chuẩn doanh nghiệp chạy thực tế được quy hoạch mạng lưới các container cô lập hoàn hảo:</p>

          <div class="visual-schema" style="background:#1e1e2f; padding: 2rem; border-radius: 8px; font-family: monospace; text-align: left; color: #a5b4fc; line-height: 1.6;">
            <strong>[ KHÁCH HÀNG INTERNET ]</strong> <br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⬇ (HTTPS / Port 443)<br>
            <strong>[ Container Nginx (Reverse Proxy & SSL Gateway) ]</strong><br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ├── / &nbsp; &nbsp; &nbsp; &nbsp; ➜ <strong>[ Container ReactJS (Static Content - Port 3000) ]</strong><br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └── /api/* &nbsp; ➜ <strong>[ Container Spring Boot Backend (API Services - Port 8080) ]</strong><br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ├── <strong>[ Container Redis (Caching - Port 6379) ]</strong><br>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └── <strong>[ Container PostgreSQL (Database - Port 5432) ]</strong>
          </div>

          <h3>Các quy tắc bảo mật kiến trúc bắt buộc:</h3>
          <ol>
            <li><strong>Chỉ mở duy nhất cổng 80/443 của Nginx ra ngoài:</strong> Các container còn lại (React, Spring, PG, Redis) không được gán ports ra host (không khai báo ports dạng - "5432:5432" trong compose sản xuất). Chúng giao tiếp hoàn toàn qua Docker Network nội bộ.</li>
            <li><strong>Persist dữ liệu:</strong> Postgres và Redis bắt buộc sử dụng Named Volumes lưu giữ liệu ngoài ổ đĩa Host vật lý.</li>
            <li><strong>Giám sát (Monitoring):</strong> Tích hợp các container phụ (Prometheus, Grafana) thu thập CPU/RAM/Network của cả cụm để gửi cảnh báo khi quá tải.</li>
          </ol>
        `,
        quiz: [
          {
            question: "Tại sao trên Production ta không nên khai báo cổng '5432:5432' cho Database Postgres?",
            options: [
              "Để tránh lộ cổng DB ra ngoài Internet, ngăn ngừa hacker quét cổng và tấn công trực tiếp vào cơ sở dữ liệu.",
              "Vì Docker Compose không hỗ trợ.",
              "Làm cho database chạy chậm đi.",
              "Để tiết kiệm RAM hệ thống."
            ],
            correct: 0,
            explanation: "Chỉ mở cổng Nginx ra ngoài mạng. Cơ sở dữ liệu Postgres chỉ nên hoạt động kín trong mạng ảo nội bộ để đảm bảo an ninh thông tin tối đa."
          }
        ]
      }
    ]
  },
  {
    level: 12,
    title: "Final Challenge & Escape Room",
    description: "Đồ án Đỉnh Cao: Thực chiến 4 dự án lớn & Thử thách giải cứu Server 2h sáng!",
    topics: [
      {
        id: "l12-challenges",
        title: "12.1 Danh sách 4 Dự án thực tế thử thách bản lĩnh DevOps",
        badge: "Theory",
        difficulty: "Advanced",
        content: `
          <h2>Vượt qua 4 Thử thách Thực tế để hoàn thành khóa học xuất sắc!</h2>
          <p>Bạn đã đồng hành qua một hành trình dài từ số 0 tới chuyên gia! Dưới đây là 4 đồ án tốt nghiệp giúp bạn khẳng định kỹ năng trên CV tuyển dụng:</p>
          
          <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1.5rem;">
            
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: 8px; border-left: 4px solid var(--accent-blue);">
              <h3 style="margin-top:0; color:var(--text-color);">🔥 Đồ án 1: Spring Boot 3 + SQL Server Enterprise</h3>
              <p style="margin: 0.5rem 0; font-size:0.9rem; color:var(--text-muted);">
                Đóng gói Java App + Database SQL Server chạy trên Linux Container. Thiết lập Volume lưu dữ liệu mssql, backup file .bak tự động.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: 8px; border-left: 4px solid var(--accent-blue);">
              <h3 style="margin-top:0; color:var(--text-color);">🔥 Đồ án 2: ReactJS + Spring Boot + PostgreSQL + Nginx Reverse Proxy</h3>
              <p style="margin: 0.5rem 0; font-size:0.9rem; color:var(--text-muted);">
                Viết file compose.yaml kết nối toàn diện 4 dịch vụ. Cấu hình Nginx routing và thiết lập tệp .env ẩn toàn bộ mật khẩu.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: 8px; border-left: 4px solid var(--accent-blue);">
              <h3 style="margin-top:0; color:var(--text-color);">🔥 Đồ án 3: Hệ thống Microservices phân tán + Caching Redis</h3>
              <p style="margin: 0.5rem 0; font-size:0.9rem; color:var(--text-muted);">
                Đóng gói đa dịch vụ giao tiếp qua REST API/gRPC. Tối ưu hóa bộ nhớ đệm cache bằng container Redis giới hạn 256MB RAM tối đa.
              </p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: 8px; border-left: 4px solid var(--accent-blue);">
              <h3 style="margin-top:0; color:var(--text-color);">🔥 Đồ án 4: Toàn diện hóa: Production Cloud + CI/CD Actions + Monitoring</h3>
              <p style="margin: 0.5rem 0; font-size:0.9rem; color:var(--text-muted);">
                Cấu hình GitHub Actions chạy JUnit/Jest test ➜ Tự động build image ➜ Quét trivy bảo mật ➜ Push Docker Hub ➜ Auto deploy VPS ➜ Giám sát qua Prometheus.
              </p>
            </div>

          </div>

          <div class="info-box" style="margin-top:2rem;">
            <p><strong>🎉 Chúc mừng bạn!</strong> Bằng việc hoàn thành xuất sắc đồ án này, bạn đã chính thức nắm giữ chiếc chìa khóa vạn năng để vận hành thế giới DevOps chuyên nghiệp! Hãy tự hào ghi nhận Docker Master vào hành trang nghề nghiệp của bạn!</p>
          </div>
        `,
        quiz: [
          {
            question: "Để nâng cao chất lượng lập trình DevOps, bước nào nên được chạy tự động trong CI pipeline trước khi build image?",
            options: [
              "Hỏi ý kiến quản lý.",
              "Biên dịch mã nguồn và chạy toàn bộ các bài kiểm thử tự động (Unit/Integration Tests) để chặn lỗi từ sớm.",
              "Deploy trực tiếp lên server rồi mới test.",
              "Không cần kiểm tra."
            ],
            correct: 1,
            explanation: "Chạy test tự động trong CI trước khi build giúp đảm bảo chỉ có code chuẩn chất lượng 100% mới được phép xuất xưởng thành Image."
          }
        ]
      },
      {
        id: "l12-escape-room",
        title: "12.2 Thử thách Escape Room: Sự cố Hacker Đào Coin Trộm",
        badge: "Practice",
        difficulty: "Expert",
        content: `
          <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid var(--accent-red); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; animation: pulseRed 2s infinite; box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);">
            <h2 style="color: var(--accent-red); margin-top: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.4rem;">
              <i data-lucide="alert-triangle"></i> 🚨 CẢNH BÁO SỰ CỐ KHẨN CẤP (INCIDENT 2:00 AM)
            </h2>
            <p style="margin: 0.5rem 0; font-size: 0.95rem; line-height: 1.6;"><strong>Bối cảnh:</strong> Điện thoại của bạn đổ chuông liên hồi lúc 2h sáng. Sếp gọi cháy máy! Toàn bộ khách hàng đang báo lỗi sập ứng dụng. CPU của Server VPS đột ngột tăng vọt lên 100%.</p>
            <p style="margin: 0.5rem 0; font-size: 0.95rem; line-height: 1.6;"><strong>Nhiệm vụ:</strong> Bạn có tối đa 10 phút để truy vết và khắc phục tận gốc sự cố phá hoại này trực tiếp trên Terminal và Workspace.</p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); padding: 1.2rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h3 style="margin-top:0; color: var(--accent-blue); display:flex; align-items:center; gap:6px;"><i data-lucide="slack"></i> Tin nhắn khẩn từ CEO:</h3>
            <p style="font-style: italic; color: #fca5a5; font-size: 0.95rem; line-height: 1.6; margin:0;">
              "Này em ơi! Web đang chết đứng rồi! Khách hàng báo lỗi sập liên tục. Nhanh điều tra xem có phải server bị hacker xâm nhập đào coin trộm không! Giải cứu server gấp!!!"
            </p>
          </div>

          <h3 style="color:var(--text-color); border-bottom: 1px solid var(--border-color); padding-bottom:0.5rem;"><i data-lucide="shield-alert"></i> Quy trình 5 bước giải cứu hệ thống:</h3>
          <ol style="line-height: 1.8; padding-left:1.2rem; font-size:0.95rem; color:var(--text-muted);">
            <li><strong>Bước 1:</strong> Gõ lệnh <code style="color:var(--accent-blue);">docker stats</code> trong Terminal bên phải để tìm container lạ đang ngốn 100% CPU.</li>
            <li><strong>Bước 2:</strong> Dùng lệnh <code style="color:var(--accent-blue);">docker top hacker-app</code> để truy vết tiến trình mã độc chạy ngầm trong container đó.</li>
            <li><strong>Bước 3:</strong> Dùng lệnh <code style="color:var(--accent-blue);">docker exec -it hacker-app rm -f /var/tmp/miner</code> để xóa sổ file thực thi đào coin trộm.</li>
            <li><strong>Bước 4:</strong> Dùng lệnh <code style="color:var(--accent-blue);">docker update --cpus="0.2" --memory="64m" hacker-app</code> để khống chế triệt để RAM/CPU của container bị tấn công.</li>
            <li><strong>Bước 5:</strong> Mở tệp <code style="color:var(--accent-blue);">nginx.conf</code> bên tab VSCode IDE, thêm dòng chặn IP của hacker: <code style="color:var(--accent-green);">deny 198.51.100.42;</code> ở dòng số 5 và nhấn <strong>Cấu hình Gateway</strong> để hoàn thành!</li>
          </ol>
          
          <div style="margin-top: 2rem;">
            <button id="btn-start-escape-room" class="btn btn-primary" style="background: var(--accent-red); border-color: var(--accent-red); padding: 1rem 1.5rem; font-weight: 700; width: 100%; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; transition: all 0.3s ease; font-size: 1.05rem; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);">
              <i data-lucide="play-circle"></i> KÍCH HOẠT ĐẤU TRƯỜNG DEVOPS ESCAPE ROOM
            </button>
          </div>
        `,
        practice: {
          type: "escape-room",
          instructions: "Hãy nhấn nút màu đỏ bên dưới để kích hoạt còi báo động khẩn cấp và tiến hành 5 bước giải cứu server!",
          expectedState: {
            step: 5
          },
          hints: [
            "Bước 1: Nhập lệnh `docker stats` và nhấn Enter để phát hiện container 'hacker-app' đang ngốn CPU.",
            "Bước 2: Xem danh sách tiến trình của container mã độc bằng lệnh `docker top hacker-app`.",
            "Bước 3: Xóa file virus đào coin bằng lệnh `docker exec -it hacker-app rm -f /var/tmp/miner`.",
            "Bước 4: Giới hạn tài nguyên container bằng lệnh `docker update --cpus=\"0.2\" --memory=\"64m\" hacker-app`.",
            "Bước 5: Sửa tệp nginx.conf trong VSCode, thêm dòng `deny 198.51.100.42;` dưới dòng comment chỉ định, rồi nhấn Cấu hình Gateway."
          ],
          solutions: "1. docker stats\n2. docker top hacker-app\n3. docker exec -it hacker-app rm -f /var/tmp/miner\n4. docker update --cpus=\"0.2\" --memory=\"64m\" hacker-app\n5. Thêm 'deny 198.51.100.42;' vào nginx.conf dòng 5."
        },
        quiz: [
          {
            question: "Mục đích cốt lõi của việc khống chế tài nguyên (docker update) và chặn IP (Nginx deny) trong tình huống này là gì?",
            options: [
              "Để server chạy nhanh hơn.",
              "Vừa vô hiệu hóa tạm thời khả năng phá hoại của container bị hack, vừa ngăn chặn hacker tiếp tục gửi truy vấn tấn công DDoS vào hệ thống.",
              "Để xóa bỏ container đó ngay lập tức.",
              "Để tiết kiệm ổ cứng SSD."
            ],
            correct: 1,
            explanation: "Khống chế tài nguyên chặn malware ăn CPU, chặn IP ngăn hacker gửi lệnh điều khiển DDoS, giúp hệ thống phục hồi an toàn."
          }
        ]
      }
    ]
  }
];
