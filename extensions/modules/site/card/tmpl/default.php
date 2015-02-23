<?php
/**
 * @package     Github.Module
 * @subpackage  Card.Layout
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

extract($displayData);

/**
 * Layout variables
 * -----------------
 * @var   string           $cssClass        Module CSS class
 * @var   string           $cssId           Module CSS identifier
 * @var   object           $module          Module data as it comes from Joomla
 * @var   phprobertoModule  $moduleInstance  Module rendering this layout
 * @var   JRegistry        $params          Object with the module config
 * @var   stdClass         $profile         Array of items to render
 */

$moduleInstance->loadStylesheet('style.min.css');

$cssId = $cssId ? 'id="' . $cssId . '"' : null;
?>
<div class="<?php echo $cssClass; ?> default" <?php echo $cssId; ?>>
	<?php echo $moduleInstance->setLayout('default_card')->render($displayData); ?>
</div>
