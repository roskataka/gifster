import { toSingleGif } from '../views/trending_view.js';

export const toUploadsView = (uploadedGifs) => `
<form id="registerUpload">
<div class="upload_form">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" name="username" placeholder="Username...">
</div> 

<div class="upload_form">
    <label for="gif" class="form-label">Upload GIF</label>
    <input type="file" class="form-control" name="file" id="file">
</div>

<div class="upload_form">
    <label for="url" class="form-label">GIF URL</label>
    <input type="text" class="form-control" name="source_image_url" id="source_image_url">
</div>

<div class="upload_form">
    <label for="tags" class="form-label">Tags</label><br>
    <input type="text" class="form-control" name="tags" id="tags">
</div>

<button type="submit" class="btn" id="submit_btn">Submit</button>
</form>

<div class="uploaded_grid">
    ${uploadedGifs.map(toSingleGif).join('\n')}
</div>
`;