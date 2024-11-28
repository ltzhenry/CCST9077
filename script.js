document.addEventListener('DOMContentLoaded', function () {
    // 渐入效果
    const sections = document.querySelectorAll('.act');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 创建 3D 场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    function createStarField() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            starVertices.push(x, y, z);
        }
    
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starField = new THREE.Points(starsGeometry, starsMaterial);
    
        scene.add(starField);
    }
    
    createStarField();

    // 创建黑洞效果
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const blackhole = new THREE.Mesh(geometry, material);

    scene.add(blackhole);
    camera.position.z = 30;
    // act 1
    const chooseRevenge = document.getElementById('choose-revenge');
    const chooseForgive = document.getElementById('choose-forgiveness');
    const nextAct1Button = document.getElementById('next-act-1');

    // 第一幕的选择事件监听器，显示下一幕按钮
    chooseRevenge.addEventListener('click', function () {
        nextAct1Button.style.display = 'block'; // 显示“Next Act”按钮
    });

    chooseForgive.addEventListener('click', function () {
        nextAct1Button.style.display = 'block'; // 显示“Next Act”按钮
    });

    // 第一幕的“Next Act”按钮事件，显示第二幕
    nextAct1Button.addEventListener('click', function () {
        document.getElementById('act1').style.display = 'none'; // 隐藏第一幕
        document.getElementById('act2').style.display = 'block'; // 显示第二幕
        document.getElementById('next-act-2').style.display = 'block'; // 显示第二幕的“Next Act”按钮
    });

    // 第二幕的下一幕按钮
    const nextAct2Button = document.getElementById('next-act-2');

    // 第二幕的“Next Act”按钮事件，显示第三幕
    nextAct2Button.addEventListener('click', function () {
        document.getElementById('act2').style.display = 'none'; // 隐藏第二幕
        document.getElementById('act3').style.display = 'block'; // 显示第三幕
        document.getElementById('next-act-3').style.display = 'block'; // 显示第二幕的“Next Act”按钮
    });

    // 第三幕的下一幕按钮
    const nextAct3Button = document.getElementById('next-act-3');

    // 第三幕的“Next Act”按钮事件，显示第四幕
    nextAct3Button.addEventListener('click', function () {
        document.getElementById('act3').style.display = 'none'; // 隐藏第三幕
        document.getElementById('act4').style.display = 'block'; // 显示第四幕
        document.getElementById('next-act-4').style.display = 'block'; // 显示第二幕的“Next Act”按钮
        
    });

    // 第四幕的下一幕按钮
    const nextAct4Button = document.getElementById('next-act-4');

    // 第四幕的“Next Act”按钮事件，显示第五幕
    nextAct4Button.addEventListener('click', function () {
        document.getElementById('act4').style.display = 'none'; // 隐藏第四幕
        document.getElementById('act5').style.display = 'block'; // 显示第五幕
        
    });

    // 创建用于监听第四幕的观察者
    const observerAct4 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 当用户滚动到第四幕时，改变黑洞效果
                blackhole.material.color.setHex(0xff0000); // 黑洞变为红色，象征紧迫感
                blackhole.rotationSpeed = 0.05; // 加速旋转
            } else {
                blackhole.material.color.setHex(0x000000); // 恢复为黑色
                blackhole.rotationSpeed = 0.01; // 恢复到正常的速度
            }
        });
    }, { threshold: 0.5 });

    observerAct4.observe(act4);

    function animate() {
        requestAnimationFrame(animate);

        // 黑洞的旋转效果，象征时间的流动和扭曲
        blackhole.rotation.x += 0.01;
        blackhole.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

});

