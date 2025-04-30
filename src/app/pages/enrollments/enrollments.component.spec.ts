import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsComponent } from './enrollments.component';

describe('EnrollmentsComponent', () => {
  let component: EnrollmentsComponent;
  let fixture: ComponentFixture<EnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



<ul class="nav nav-tabs">
    <li  class="active" data-active="#home"><a data-toggle="tab" href="#home">Home</a></li>
    <li  data-active="#menu1"><a data-toggle="tab" href="#menu1">Menu 1</a></li>
    <li  data-active="#menu2"><a data-toggle="tab" href="#menu2">Menu 2</a></li>
    <li  data-active="#menu3"><a data-toggle="tab" href="#menu3">Menu 3</a></li>
  </ul>

  <div class="tab-content">
    <div id="home" class="tab-pane fade in active">
      <h3>HOME</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div class="btn-wrap">
            <a class="btn btn-default" data-toggle="tab" href="#menu1"  onclick="toggleTab(this);">Next</a>
      </div>
    </div>
    <div id="menu1" class="tab-pane fade">
      <h3>Menu 1</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div class="btn-wrap">
                <a class="btn btn-default" data-toggle="tab" href="#home"  onclick="toggleTab(this);">Previous</a>
                <a class="btn btn-primary" data-toggle="tab" href="#menu2" onclick="toggleTab(this);">Next</a>
            </div>
    </div>
    <div id="menu2" class="tab-pane fade">
      <h3>Menu 2</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
        <div class="btn-wrap">
            <a class="btn btn-default" data-toggle="tab" href="#menu1"  onclick="toggleTab(this);">Previous</a>
            <a class="btn btn-primary" data-toggle="tab" href="#menu3"  onclick="toggleTab(this);">Next</a>
        </div>
    </div>
    <div id="menu3" class="tab-pane fade">
      <h3>Menu 3</h3>
      <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <div class="btn-wrap">
        <a class="btn btn-default"  data-toggle="tab" href="#menu2" onclick="toggleTab(this);">Previous</a>
  </div>
    </div>
  </div>
</div>
</body>
</html>
